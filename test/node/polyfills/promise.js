var fs     = require('fs');
var assert = require('assert');

eval(
    '(function () {\n' +
    fs.readFileSync('./polyfills/Promise/polyfill.js', 'utf8') +
    '}).call(global);'
);

describe('global.Promise', function () {
    it('is correctly defined', function () {
        assert.equal(typeof global.Promise, 'function');
        assert.equal(typeof Promise.resolve, 'function', 'Missing Promise.resolve');
        //assert.equal(typeof Promise.reject, 'function', 'Missing Promise.rejected');
        assert.equal(typeof Promise.all, 'function', 'Missing Promise.all');
        assert.equal(typeof Promise.race, 'function', 'Missing Promise.race');
    });
});

describe('infinite recursion', function () {
    it('should not happen!', function (done) {
        var p = Promise.resolve(42);

        var p2 = p.then(function () {
            return p;
        });

        p2.then(function (v) {
            done(new Error('promise should have been rejected: ' + (v instanceof Promise)));
        }, function () {
            done();
        });
    });
});

describe('Promises A+ Tests', function () {
    var adapter = {
        resolved: function (value) {
            return new Promise(function (resolve) {
                resolve(value);
            });
        },
        rejected: function (reason) {
            return new Promise(function (resolve, reject) {
                reject(reason);
            });
        },
        deferred: function () {
            var deferred = {};

            deferred.promise = new Promise(function (resolve, reject) {
                deferred.resolve = resolve;
                deferred.reject = reject;
            });

            return deferred;
        }
    };

    require('promises-aplus-tests').mocha(adapter);
});
