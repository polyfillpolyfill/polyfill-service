
// _ESAbstract.AddEntriesFromIterable
/* global IsCallable, GetIterator, IteratorStep, IteratorValue, IteratorClose, Get, Call, Type */
// 23.1.1.2 AddEntriesFromIterable ( target, iterable, adder )
function AddEntriesFromIterable(target, iterable, adder) { // eslint-disable-line no-unused-vars
    // 1. If IsCallable(adder) is false, throw a TypeError exception.
    if (IsCallable(adder) === false) {
        throw new TypeError("adder is not callable.");
    }
    // 2. Assert: iterable is present, and is neither undefined nor null.
    // 3. Let iteratorRecord be ? GetIterator(iterable).
    var iteratorRecord = GetIterator(iterable);
    // 4. Repeat,
    while (true) {
        // a. Let next be ? IteratorStep(iteratorRecord).
        var next = IteratorStep(iteratorRecord);
        // b. If next is false, return target.
        if (next === false) {
            return target;
        }
        // c. Let nextItem be ? IteratorValue(next).
        var nextItem = IteratorValue(next);
        // d. If Type(nextItem) is not Object, then
        if (Type(nextItem) !== "object") {
            // i. Let error be ThrowCompletion(a newly created TypeError object).
            var error = new TypeError("nextItem is not an object");
            // ii. Return ? IteratorClose(iteratorRecord, error).
            IteratorClose(iteratorRecord, error);
            throw error;
        }
        var k;
        try {
            // e. Let k be Get(nextItem, "0").
            k = Get(nextItem, "0");
        } catch (k) {
            // f. If k is an abrupt completion, return ? IteratorClose(iteratorRecord, k).
            return IteratorClose(iteratorRecord, k);
        }
        var v;
        try {
            // g. Let v be Get(nextItem, "1").
            v = Get(nextItem, "1");
        } catch (v) {
            // h. If v is an abrupt completion, return ? IteratorClose(iteratorRecord, v).
            return IteratorClose(iteratorRecord, v);
        }
        try {
            // i. Let status be Call(adder, target, « k.[[Value]], v.[[Value]] »).
            Call(adder, target, [k, v]);
        } catch (status) {
            // j. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
            return IteratorClose(iteratorRecord, status);
        }
    }
}