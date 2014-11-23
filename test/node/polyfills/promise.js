var fs     = require('fs');
var assert = require('assert');

eval(
    '(function () {\n' +
    fs.readFileSync('./polyfills/Promise/polyfill.js', 'utf8') +
    '}).call(global);'
);

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
