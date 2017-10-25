/*!
 * compression
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const accepts = require('accepts');
const bytes = require('bytes');
const compressible = require('compressible');
const debug = require('debug')('compression');
const Duplex = require('stream').Duplex;
const iltorb = require('iltorb');
const lruCache = require('lru-cache');
const multipipe = require('multipipe');
const onHeaders = require('on-headers');
const Readable = require('stream').Readable;
const util = require('util');
const vary = require('vary');
const Writable = require('stream').Writable;
const zlib = require('zlib');
const zopfli = require('node-zopfli');

/**
 * Module exports.
 */

module.exports = compression;
module.exports.filter = shouldCompress;
module.exports.stack = {
    next: function () {
        ++stackSize;
    },
    prev: function () {
        --stackSize;
    },
    get: function () {
        return stackSize;
    }
};

/**
 * Module variables.
 * @private
 */

const cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/;
// according to https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html , brotli:4
// is slightly faster than gzip with somewhat better compression; good default if we don't want to
// worry about compression runtime being slower than gzip
const BROTLI_DEFAULT_QUALITY = 4;
const DEFAULT_CACHE = 60;
let stackSize = 0;

/**
 * Compress response data with gzip / deflate.
 *
 * @param {Object} [options]
 * @return {Function} middleware
 * @public
 */

function compression(options) {
    const opts = options || {};

    // options
    const filter = opts.filter || shouldCompress;
    const maxStack = opts.maxStack || Infinity;
    let threshold = bytes.parse(opts.threshold);

    if (threshold === null || threshold === undefined) {
        threshold = 1024;
    }

    const brotliOpts = opts.brotli || {};
    brotliOpts.quality = brotliOpts.quality || BROTLI_DEFAULT_QUALITY;

    const zlibOpts = opts.zlib || {};
    const zlibOptNames = ['flush', 'chunkSize', 'windowBits', 'level', 'memLevel', 'strategy', 'dictionary'];
    zlibOptNames.forEach(function (option) {
        zlibOpts[option] = zlibOpts[option] || opts[option];
    });

    if (!opts.hasOwnProperty('cacheSize')) opts.cacheSize = '128mB';
    const cache = opts.cacheSize ? createCache(bytes(opts.cacheSize.toString())) : null;

    const shouldCache = opts.cache || function () {
        return true;
    };

    const dummyBrotliFlush = function () {
    };

    return function compression(req, res, next) {
        let ended = false;
        let length;
        let listeners = [];
        let stream;

        const _end = res.end;
        const _on = res.on;
        const _write = res.write;
        const isOverloaded = maxStack < module.exports.stack.get();

        // flush
        res.flush = function flush() {
            if (stream) {
                stream.flush();
            }
        };

        // proxy
        res.write = function write(chunk, encoding) {
            if (ended) {
                return false;
            }

            if (!this._header) {
                this._implicitHeader();
            }

            return stream
                ? stream.write(new Buffer(chunk, encoding))
                : _write.call(this, chunk, encoding);
        };

        res.end = function end(chunk, encoding) {
            if (ended) {
                return false;
            }

            if (!this._header) {
                // estimate the length
                if (!this.getHeader('Content-Length')) {
                    length = chunkLength(chunk, encoding);
                }

                this._implicitHeader();
            }

            if (!stream) {
                return _end.call(this, chunk, encoding);
            }

            // mark ended
            ended = true;
            // write Buffer for Node.js 0.8
            return chunk
                ? stream.end(new Buffer(chunk, encoding))
                : stream.end();
        };

        res.on = function on(type, listener) {
            if (!listeners || type !== 'drain') {
                return _on.call(this, type, listener);
            }

            if (stream) {
                return stream.on(type, listener);
            }

            // buffer listeners for future stream
            listeners.push([type, listener]);

            return this;
        };

        function nocompress(msg) {
            debug(`no compression [URL] ${req.url} [REASON]: %s`, msg);
            addListeners(res, _on, listeners);
            listeners = null;
        }

        onHeaders(res, function onResponseHeaders() {
            // determine if request is filtered
            if (!filter(req, res)) {
                nocompress(`filterd`);
                return;
            }

            // determine if the entity should be transformed
            if (!shouldTransform(req, res)) {
                nocompress('no transform');
                return;
            }

            //Compression stack is overloaded. Add marker to request for cache controlling
            if (isOverloaded) {
                res.setHeader('Cache-Control', `public, max-age=${options.cacheControl || DEFAULT_CACHE}`);
                nocompress('compression stack is oveloaded');
                return;
            }

            // vary
            vary(res, 'Accept-Encoding');

            // content-length below threshold
            if (Number(res.getHeader('Content-Length')) < threshold || length < threshold) {
                nocompress('size below threshold');
                return;
            }

            const encoding = res.getHeader('Content-Encoding') || 'identity';

            // already encoded
            if (encoding !== 'identity') {
                nocompress('already encoded');
                return;
            }

            // head
            if (req.method === 'HEAD') {
                nocompress('HEAD request');
                return;
            }

            const contentType = res.getHeader('Content-Type');

            // compression method
            const accept = accepts(req);
            // send in each compression method separately to ignore client preference and
            // instead enforce server preference. also, server-sent events (mime type of
            // text/event-stream) require flush functionality, so skip brotli in that
            // case.
            const method = (contentType !== 'text/event-stream' && accept.encoding('br')) ||
                accept.encoding('gzip') ||
                accept.encoding('deflate') ||
                accept.encoding('identity');

            // negotiation failed
            if (!method || method === 'identity') {
                nocompress('not acceptable');
                return;
            }

            module.exports.stack.next();

            // do we have this coding/url/etag combo in the cache?
            const etag = res.getHeader('ETag') || null;
            const cacheable = cache && shouldCache(req, res) && etag && res.statusCode >= 200 && res.statusCode < 300;
            if (cacheable) {
                const buffer = cache.lookup(method, req.url, etag);
                if (buffer) {
                    // the rest of the code expects a duplex stream, so
                    // make a duplex stream that just ignores its input
                    stream = new BufferDuplex(buffer);
                }
            }

            // if stream is not assigned, we got a cache miss and need to compress
            // the result
            if (!stream) {
                // compression stream
                debug('%s compression', method);
                switch (method) {
                    case 'br':
                        stream = iltorb.compressStream(brotliOpts);
                        // brotli has no flush method. add a dummy flush method here.
                        stream.flush = dummyBrotliFlush;
                        break;
                    case 'gzip':
                        stream = zlib.createGzip(zlibOpts);
                        break;
                    case 'deflate':
                        stream = zlib.createDeflate(zlibOpts);
                        break;
                }

                // if it is cacheable, let's keep hold of the compressed chunks and cache
                // them once the compression stream ends.
                if (cacheable) {
                    const chunks = [];
                    stream.on('data', function (chunk) {
                        chunks.push(chunk);
                    });
                    stream.on('end', function () {
                        cache.add(method, req.url, etag, chunks);
                    });
                }
            }
            // add buffered listeners to stream
            addListeners(stream, stream.on, listeners);

            // header fields
            res.setHeader('Content-Encoding', method);
            res.removeHeader('Content-Length');

            // compression
            stream.on('data', function onStreamData(chunk) {
                if (_write.call(res, chunk) === false) {
                    stream.pause();
                }
            });

            stream.on('end', function onStreamEnd() {
                setTimeout(function () {
                    module.exports.stack.prev();
                    _end.call(res);
                }, 10);
            });

            _on.call(res, 'drain', function onResponseDrain() {
                stream.resume();
            });
        });

        next();
    };
}

/**
 * Add bufferred listeners to stream
 * @private
 */

function addListeners(stream, on, listeners) {
    for (let i = 0; i < listeners.length; i++) {
        on.apply(stream, listeners[i]);
    }
}

/**
 * Get the length of a given chunk
 */

function chunkLength(chunk, encoding) {
    if (!chunk) {
        return 0;
    }

    return !Buffer.isBuffer(chunk)
        ? Buffer.byteLength(chunk, encoding)
        : chunk.length;
}

/**
 * Default filter function.
 * @private
 */

function shouldCompress(req, res) {
    const type = res.getHeader('Content-Type');

    if (type === undefined || !compressible(type)) {
        debug('%s not compressible', type);
        return false;
    }

    return true;
}

/**
 * Determine if the entity should be transformed.
 * @private
 */

function shouldTransform(req, res) {
    const cacheControl = res.getHeader('Cache-Control');

    // Don't compress for Cache-Control: no-transform
    // https://tools.ietf.org/html/rfc7234#section-5.2.2.4
    return !cacheControl ||
        !cacheControlNoTransformRegExp.test(cacheControl);
}

function createCache(size) {
    const index = {};
    const lru = lruCache({
        max: size,
        length: function (item) {
            return item.buffer.length + item.coding.length + 2 * (item.url.length + item.etag.length);
        },
        dispose: function (key, item) {
            // remove this particular representation (by etag)
            delete index[item.coding][item.url][item.etag];

            // if there are no more representations of the url left, remove the
            // entry for the url.
            if (Object.keys(index[item.coding][item.url]).length === 0) {
                delete index[item.coding][item.url];
            }
        }
    });

    return {
        add: function (coding, url, etag, buffer) {
            // check to see if another request already filled the cache; avoids
            // a lot of work if there's a thundering herd.
            if (index[coding] && index[coding][url] && index[coding][url][etag]) {
                return;
            }

            if (Array.isArray(buffer)) {
                buffer = Buffer.concat(buffer);
            }

            const item = {
                coding: coding,
                url: url,
                etag: etag,
                buffer: buffer
            };
            const key = {};

            index[coding] = index[coding] || {};
            index[coding][url] = index[coding][url] || {};
            index[coding][url][etag] = key;

            lru.set(key, item);

            // now asynchronously re-encode the entry at best quality
            const result = new BufferWritable();

            new BufferReadable(buffer)
                .pipe(getBestQualityReencoder(coding))
                .pipe(result)
                .on('finish', function () {
                    const itemInCache = lru.peek(key);
                    if (itemInCache) {
                        itemInCache.buffer = result.toBuffer();
                    }
                });
        },

        lookup: function (coding, url, etag) {
            if (index[coding] && index[coding][url] && index[coding][url][etag]) {
                return lru.get(index[coding][url][etag]).buffer;
            }
            return null;
        }
    };
}

function BufferReadable(buffer, opt) {
    Readable.call(this, opt);
    this.buffer = buffer;
}

util.inherits(BufferReadable, Readable);

BufferReadable.prototype._read = function () {
    if (!this.ended) {
        this.push(this.buffer);
        this.ended = true;
    } else {
        this.push(null);
    }
};

function BufferWritable(opt) {
    Writable.call(this, opt);
    this.chunks = [];
}

util.inherits(BufferWritable, Writable);

BufferWritable.prototype._write = function (chunk, encoding, callback) {
    this.chunks.push(chunk);
    callback();
};

BufferWritable.prototype.toBuffer = function () {
    return Buffer.concat(this.chunks);
};

// this duplex just ignores its write side and reads out the buffer as
// requested
function BufferDuplex(buffer, opts) {
    Duplex.call(this, opts);
    this.buffer = buffer;
}

util.inherits(BufferDuplex, Duplex);

BufferDuplex.prototype._read = function (size) {
    if (!this.cursor) this.cursor = 0;
    if (this.cursor >= this.buffer.length) {
        this.push(null);
        return;
    }

    const endIndex = Math.min(this.cursor + size, this.buffer.length);
    this.push(this.buffer.slice(this.cursor, endIndex));
    this.cursor = endIndex;
};

BufferDuplex.prototype._write = function (chunk, encoding, callback) {
    callback();
};

// get a decode --> encode transform stream that will re-encode the content at
// the best quality available for that coding method.
function getBestQualityReencoder(coding) {
    switch (coding) {
        case 'gzip':
            return multipipe(zlib.createGunzip(), zopfli.createGzip());
        case 'deflate':
            // for some reason, re-encoding with deflate makes some tests fail on
            // the travis machines. until we can figure this out, just offer a passthrough,
            // and don't re-encode deflate.
            // return multipipe(zlib.createInflate(), zopfli.createDeflate())
            const PassThrough = require('stream').PassThrough;
            return new PassThrough();
        case 'br':
            return multipipe(iltorb.decompressStream(), iltorb.compressStream());
    }
}
