'use strict';

const Transform = require('stream').Transform;
const util = require('util');

const StreamCombiner = function() {
	Transform.call(this, {});
	this.streams = [];
	this.currentStream = null;
};
util.inherits(StreamCombiner, Transform);

StreamCombiner.prototype._transform = function(chunk, encoding, callback) {
	callback(null, chunk);
};

StreamCombiner.prototype._nextStream = function() {

	if (!this.streams.length) {
		return;
	}

	let candidateStream = this.streams.shift();

	// Allow lazy-loading stream sources
	if (typeof candidateStream === 'function') {
		candidateStream = candidateStream();
	}

	if (!candidateStream) {
		this.push(null);
	} else if (typeof candidateStream === 'string') {
		this.push(candidateStream);
		this._nextStream();
	} else if (candidateStream.constructor === Promise) {
		candidateStream.then(result => {
			this.push(result);
			this._nextStream();
		});
	} else {
		this.currentStream = candidateStream;
		this.currentStream.pipe(this, {end: false});
		this.currentStream.on('end', () => this._nextStream());
	}

};

StreamCombiner.prototype.queue = function(newSrc) {
	this.streams.push(newSrc);
	if (!this.currentStream) this._nextStream();
};

StreamCombiner.prototype.finalize = function() {
	this.streams.push(null);
	if (!this.currentStream) this._nextStream();
};

module.exports = StreamCombiner;
