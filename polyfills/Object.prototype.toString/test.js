var toString = {}.toString

[
    [null, 'Null', 'null'],
    [undefined, 'Undefined', 'undefined'],

    [[],           'Array',    'array literal'],
    [function(){}, 'Function', 'function literal'],
    [{},           'Object',   'object literal'],
    [/foo/,        'RegExp',   'regex literal'],
    ['',           'String',   'string literal'],

    [new (function Foo(){})(), 'Object', 'new constructed custom object'],

    [Object, 'Function', 'Object reference'],
    [Math,   'Math',     'Math reference'],

    [new Array(),  'Array',  'new Array()'],
    [new Date(),   'Date',   'new Date()'],
    [new RegExp(), 'RegExp', 'new RegExp()'],
    [new String(), 'String', 'new String()']

].forEach(function (tuple) {
    var obj = tuple[0], name = tuple[1], description = tuple[2];
    it('should return "[object ' + name + ']" when called with a(n) '+description+' context', function () {
        expect(toString.call(obj)).to.eql('[object ' + name + ']');
    });
})
