/*global describe, specify, it, expect, assert*/
it('has correct instance', function () {
	expect(Promise).to.be.a(Function);
});

it('has correct argument length', function () {
	expect(Promise.length).to.be(1);
});

/*
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
var dummy = {dummy: 'dummy'};

function isFulfilled(promise, done, callback) {
    promise.then(function (value) {
        setTimeout(function () {
            callback(value);
        }, 0);
    }, function () {
        setTimeout(function () {
            done(new Error('Promise rejected instead of fulfilled'));
        }, 0);
    });
}

function isRejected(promise, done, callback) {
    promise.then(function () {
        setTimeout(function () {
            done(new Error('Promise fulfilled instead of rejected'));
        }, 0);
    }, function (reason) {
        setTimeout(function () {
            callback(reason);
        }, 0);
    });
}

function fulfilledAfter(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(ms);
        }, ms);
    });
}

function rejectedAfter(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(ms);
        }, ms);
    });
}

function extend(subclass, superclass, proto, attrs) {
	var prop;

    extend.f.prototype = superclass.prototype;
    subclass.prototype = new extend.f();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;

    if (proto) {
        for (prop in proto) {
            if (proto.hasOwnProperty(prop)) {
                subclass.prototype[prop] = proto[prop];
            }
        }
    }

    if (attrs) {
        for (prop in attrs) {
            if (attrs.hasOwnProperty(prop)) {
                subclass[prop] = attrs[prop];
            }
        }
    }

    return subclass;
}
extend.f = function () {};

describe('global.Promise', function () {
    it('is correctly defined', function () {
        assert.equal(typeof global.Promise, 'function');
        assert.equal(typeof Promise.resolve, 'function', 'Missing Promise.resolve');
        assert.equal(typeof Promise.reject, 'function', 'Missing Promise.rejected');
        assert.equal(typeof Promise.all, 'function', 'Missing Promise.all');
        assert.equal(typeof Promise.race, 'function', 'Missing Promise.race');
    });
});

describe('infinite recursion', function () {
    it('should not happen!', function (done) {
        var p = Promise.resolve(42).then(function () {
            return p;
        });

        p.then(function (v) {
            done(new Error('promise should have been rejected: ' + (v instanceof Promise)));
        }, function () {
            done();
        });
    });
});

describe('Basic promise behavior', function () {
    describe('Promise constructor', function () {
        it('should return a promise when used as a function', function () {
            expect(Promise(function () {})).to.be.a(Promise);
        });

        specify('fulfilling more than once should not change the promise value', function (done) {
            var promise = new Promise(function (resolve) {
                resolve(true);
                resolve(5);
            });

            isFulfilled(promise, done, function (value) {
                expect(value).to.be(true);
                done();
            });
        });

        specify('rejecting more than once should not change the rejection reason', function (done) {
            var promise = new Promise(function (resolve, reject) {
                reject(new Error('foo'));
                reject(new Error('bar'));
            });

            isRejected(promise, done, function (reason) {
                expect(reason.message).to.be('foo');
                done();
            });
        });

        specify('correct value for `this` inside the promise init function', function () {
            var promise = new Promise(function () {
                expect(this).to.be(undefined);
            });
        });
    });

    describe('promise.then()', function () {
        it('returns a promise', function () {
            var promise = new Promise(function (resolve) {
                resolve(5)
            });
            expect(promise).to.be.a(Promise);
        });

        it('calls its callbacks asynchronously', function () {
            var foo = false;
            var promise = new Promise(function (resolve) {
                resolve();
            }).then(function () {
                foo = true;
            });
            expect(foo).to.be(false);
        });

        /*it('returns a subclass of Promise when subclassing', function () {
            function PromiseSubclass() {
                PromiseSubclass.superclass.constructor.apply(this, arguments);
            }
            extend(PromiseSubclass, Promise);
            PromiseSubclass._defer = Promise._defer;

            var promise = new PromiseSubclass(function () {}).then();

            expect(promise).to.be.a(Promise);
            expect(promise).to.be.a(PromiseSubclass);
        });*/
    });

    describe('Behavior of the then() callbacks', function () {
        var global = Function('return this')();

        specify('throwing inside a callback should turn into a rejection', function (done) {
            var error = new Error('Arbitrary error');

            var promise = new Promise(function (resolve) {
                resolve(5);
            }).then(function (value) {
                throw error;
            });

            isRejected(promise, done, function (reason) {
                expect(reason).to.be(error);
                done();
            });
        });

        specify('returning a promise from a callback should link both promises', function (done) {
            var promise = new Promise(function (resolve) {
                resolve('placeholder');
            }).then(function () {
                return new Promise(function (resolve) {
                    resolve(5);
                });
            });

            isFulfilled(promise, done, function (value) {
                expect(value).to.be(5);
                done();
            });
        });

        specify('`this` inside a callback must be the global object in sloppy mode', function (done) {
            // this test is run only in sloppy mode
            if ((function () { return this; }()) === undefined) {
                return done();
            }

            var resolvedThis, rejectedThis,
                fulfilled = new Promise(function (resolve) {
                    resolve('value');
                }),
                rejected = new Promise(function (resolve, reject) {
                    reject('reason');
                });

            fulfilled.then(function () {
                resolvedThis = this;
                rejected.then(null, function () {
                    rejectedThis = this;
                    setTimeout(function () {
                        expect(resolvedThis).to.be(global);
                        expect(rejectedThis).to.be(global);
                        done();
                    });
                });
            });
        });

        specify('`this` inside a callback must be undefined in strict mode', function (done) {
            // This test is run only in strict mode
            'use strict';

            if ((function () { return this; }()) !== undefined) {
                return done();
            }

            var resolvedThis, rejectedThis,
                fulfilled = new Promise(function (resolve) {
                    resolve('value');
                }),
                rejected = new Promise(function (resolve, reject) {
                    reject('reason');
                });

            fulfilled.then(function () {
                resolvedThis = this;
                rejected.then(null, function () {
                    rejectedThis = this;
                    setTimeout(function () {
                        expect(resolvedThis).to.be(undefined);
                        expect(rejectedThis).to.be(undefined);
                        done();
                    }, 0);
                });
            });
        });

        specify('resolution of a thenable for a thenable that fulfills twice', function (done) {
            var dummy = { dummy: "dummy" };
            var value = {foo: 'bar'},
                other = {};

            var promise = Promise.resolve(dummy).then(function () {
                return {
                    then: function (resolvePromise) {
                        resolvePromise({
                            then: function (onFulfilled) {
                                onFulfilled({
                                    then: function (onFulfilled) {
                                        setTimeout(function () {
                                            onFulfilled(value);
                                        }, 0);
                                    }
                                });
                                onFulfilled(other);
                            }
                        });
                    }
                };
            });

            isFulfilled(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        specify('resolution of a thenable for a thenable that fulfills and then throws', function (done) {
            var value = {foo: 'bar'};

            var promise = Promise.resolve(dummy).then(function () {
                return {
                    then: function (resolvePromise) {
                        resolvePromise({
                            then: function (onFulfilled) {
                                onFulfilled({
                                    then: function (onFulfilled) {
                                        setTimeout(function () {
                                            onFulfilled(value);
                                        }, 0);
                                    }
                                });
                                throw new Error('foo');
                            }
                        });
                    }
                };
            });

            isFulfilled(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        specify('resolution of a thenable that both fulfills and rejects', function (done) {
            var value = {foo:'bar'};

            var p1 = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(value);
                }, 0);
            });

            var p2 = Promise.resolve(dummy).then(function () {
                return {
                    then: function (onFulfilled, onRejected) {
                        onFulfilled(p1);
                        onRejected(new Error('foo'));
                    }
                };
            });

            isFulfilled(p2, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });
    });

    describe('promise.catch()', function () {
        it('is a method of Promise', function () {
            var promise = new Promise(function () {});
            expect(promise['catch']).to.be.a('function');
        });

        it('does nothing to resolved promises', function (done) {
            var value = {foo:'bar'},
                resolved = new Promise(function (resolve) {
                    resolve(value);
                }),
                next;

            next = resolved['catch'](function (err) {
                return err;
            });

            expect(next).to.be.an('object');
            expect(next).to.be.a(Promise);

            isFulfilled(next, done, function (val) {
                expect(val).to.equal(value);
                done();
            });
        });

        it('is equivalent to then(undefined, fn)', function (done) {
            var reason = new Error('some error'),
                rejected = new Promise(function (resolve, reject) {
                    reject(reason);
                }),
                next;

            next = rejected['catch'](function (err) {
                return err;
            });

            isFulfilled(next, done, function (value) {
                expect(value).to.equal(reason);
                done();
            });
        });
    });
});

describe('Promise factory functions tests', function () {
    describe('Promise.resolve', function () {
        it('is a static method', function () {
            expect(Promise.resolve).to.be.a('function');
        });

        it('is fulfilled when passed a regular value', function (done) {
            var value = {},
                promise = Promise.resolve(value);

            isFulfilled(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        it('adopts the state of a rejected promise', function (done) {
            var value = {},
                fulfilled = Promise.reject(value),
                promise = Promise.resolve(fulfilled);

            isRejected(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        /*it('should preserve the constructor when using inheritance', function (done) {
            function Subpromise() {
                Subpromise.superclass.constructor.apply(this, arguments);
            }
            extend(Subpromise, Promise, null, {
                _defer: Promise._defer,
                resolve: Promise.resolve
            });

            var promise = Subpromise.resolve('foo');

            expect(promise).to.be.a(Subpromise);

            isFulfilled(promise, done, function (value) {
                expect(value).to.equal('foo');
                done();
            });
        });*/

        it('should not modify promises', function () {
            var promise = Promise.resolve(),
                wrapped = Promise.resolve(promise);

            expect(promise).to.be.a(Promise);
            expect(promise).to.be(wrapped);
        });

        it('should wrap regular values in a promise', function () {
            // truthy values
            expect(Promise.resolve(5)).to.be.a(Promise);
            expect(Promise.resolve('foo')).to.be.a(Promise);
            expect(Promise.resolve(true)).to.be.a(Promise);
            expect(Promise.resolve(function () {})).to.be.a(Promise);
            expect(Promise.resolve({})).to.be.a(Promise);

            // falsy values
            expect(Promise.resolve(0)).to.be.a(Promise);
            expect(Promise.resolve('')).to.be.a(Promise);
            expect(Promise.resolve(false)).to.be.a(Promise);
            expect(Promise.resolve(null)).to.be.a(Promise);
            expect(Promise.resolve(undefined)).to.be.a(Promise);
            expect(Promise.resolve()).to.be.a(Promise);

            // almost promises
            expect(Promise.resolve({then: 5})).to.be.a(Promise);
        });
    });

    describe('Promise.reject', function () {
        it('is a static method', function () {
            expect(Promise.reject).to.be.a('function');
        });

        it('returns a rejected promise', function (done) {
            var value = new Error('foo'),
                promise = Promise.reject(value);

            expect(promise).to.be.a(Promise);

            isRejected(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        it('should wrap fulfilled promises', function (done) {
            var value = new Promise(function (resolve) {
                    resolve('foo');
                }),
                promise = Promise.reject(value);

            isRejected(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        it('should wrap rejected promises', function (done) {
            var value = new Promise(function (resolve, reject) {
                    reject('foo');
                }),
                promise = Promise.reject(value);

            isRejected(promise, done, function (result) {
                expect(result).to.equal(value);
                done();
            });
        });

        /*it('should preserve the constructor when using inheritance', function (done) {
            function Subpromise() {
                Subpromise.superclass.constructor.apply(this, arguments);
            }
            extend(Subpromise, Promise, null, {
                _defer: Promise._defer,
                reject: Promise.reject
            });

            var promise = Subpromise.reject('foo');

            expect(promise).to.be.a(Subpromise);

            isRejected(promise, done, function (reason) {
                expect(reason).to.equal('foo');
                done();
            });
        });*/
    });
});

describe('Promise combinators', function () {
    describe('Promise.all', function () {
        it('should return a promise', function () {
            var somePromise = new Promise(function () {});

            expect(Promise.all([5])).to.be.a(Promise);
            expect(Promise.all([new Promise(function () {})])).to.be.a(Promise);
            expect(Promise.all([])).to.be.a(Promise);
            expect(Promise.all([somePromise])).not.to.equal(somePromise);
        });

        it('should turn into a rejected promise with a non array argument', function (done) {
            isRejected(Promise.all(5), done, function (error) {
                expect(error).to.be.a(TypeError);
                done();
            });
        });

        it('should preserve the order of promises', function (done) {
            var promise = Promise.all([fulfilledAfter(20), fulfilledAfter(10), fulfilledAfter(15)]);

            isFulfilled(promise, done, function (result) {
                expect(result).to.eql([20, 10, 15]);
                done();
            });
        });

        it('should wrap values in a promise', function (done) {
            var obj = {
                    hello: 'world'
                },
                promise = Promise.all(['foo', 5, obj]);

            isFulfilled(promise, done, function (result) {
                expect(result).to.eql(['foo', 5, obj]);
                done();
            });
        });

        it('correctly handles functions in arguments', function (done) {
            function testFn() {}

            isFulfilled(Promise.all([testFn]), done, function (values) {
                expect(values[0]).to.be.a('function');
                expect(values[0]).to.equal(testFn);
                done();
            });
        });

        it('should fail as fast as possible', function (done) {
            var promise = Promise.all([rejectedAfter(20), rejectedAfter(10), rejectedAfter(15)]);

            isRejected(promise, done, function (reason) {
                expect(reason).to.equal(10);
                done();
            });
        });
    });

    describe('Promise.race', function () {
        it('should turn into a rejected promise with a non array argument', function (done) {
            isRejected(Promise.race('foo'), done, function (error) {
                expect(error).to.be.a(TypeError);
                done();
            });
        });

        it('should fulfill when passed a fulfilled promise', function (done) {
            isFulfilled(Promise.race([fulfilledAfter(1)]), done, function (result) {
                expect(result).to.equal(1);
                done();
            });
        });

        it('should fulfill when passed a fulfilled promise', function (done) {
            isFulfilled(Promise.race([fulfilledAfter(1)]), done, function (result) {
                expect(result).to.equal(1);
                done();
            });
        });

        it('should reject when passed a rejected promise', function (done) {
            isRejected(Promise.race([rejectedAfter(1)]), done, function (result) {
                expect(result).to.equal(1);
                done();
            });
        });

        it('should fulfill to the value of the first promise to be fulfilled', function (done) {
            var promise = Promise.race([fulfilledAfter(10), fulfilledAfter(100)]);

            isFulfilled(promise, done, function (result) {
                expect(result).to.equal(10);
                done();
            });
        });

        it('should reject with the reason of the first promise to be rejected', function (done) {
            var promise = Promise.race([rejectedAfter(10), rejectedAfter(100)]);

            isRejected(promise, done, function (result) {
                expect(result).to.equal(10);
                done();
            });
        });
    });
});
