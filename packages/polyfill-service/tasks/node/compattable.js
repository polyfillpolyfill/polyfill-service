'use strict';

const fs = require('graceful-fs');
const path = require('path');
const denodeify = require('denodeify');
const writeFile = denodeify(fs.writeFile);
const readFile = denodeify(fs.readFile);

const intersection = (a, b) => new Set(Array.from(b).filter(value => a.has(value)));
const difference = (a, b) => new Set(Array.from(b).filter(value => !a.has(value)));

const file = path.join(__dirname, '../../test/results/results.json');
const compatFile = path.join(__dirname, '../../../docs/assets/compat.json');

console.log('Reading test result data');
readFile(file)
    .then(filedata => {
        const compat = filedata ? JSON.parse(filedata) : {};
        const builtCompatTable = {};

        Object.keys(compat).forEach(browserName => {
            const versions = compat[browserName];
            Object.keys(versions).forEach(version => {
                const testResults = versions[version];
                if (!testResults.all || !testResults.control) {
                    throw new Error("Missing test results for " + browserName + "/" + version);
                }

                const allTests = new Set(Array.from(testResults.control.testedSuites));
                const failedNative = new Set(Array.from(testResults.control.failingSuites));
                const failedPolyfilled = new Set(Array.from(testResults.all.failingSuites));

                const missing = intersection(failedNative, failedPolyfilled);
                const polyfilled = difference(failedPolyfilled, failedNative);
                const native = difference(failedNative, allTests);

                function buildData(support) {
                    return function(feature) {
                        if (!builtCompatTable[feature]) {
                            builtCompatTable[feature] = {};
                        }

                        if (!builtCompatTable[feature][browserName]) {
                            builtCompatTable[feature][browserName] = {};
                        }

                        builtCompatTable[feature][browserName][version] = support;
                    };
                };

                native.forEach(buildData('native'));
                polyfilled.forEach(buildData('polyfilled'));
                missing.forEach(buildData('missing'));
            });
        });

        // HACK: Where on earth is '1' coming from?!?
        if (builtCompatTable['1']) {
            delete builtCompatTable['1'];
        }

        return writeFile(compatFile, JSON.stringify(builtCompatTable, null, 2));
    })
    .then(() => console.log("Updated compat.json"))
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
;
