var getPolyfillsInAlias = require('./getPolyfillsInAlias');


var alias1 = process.argv[2];
var alias2 = process.argv[3];

var first = getPolyfillsInAlias(alias1);
var second = getPolyfillsInAlias(alias2);

var inFirstNotInSecond = [];
var inSecondNotInFirst = [];

first.forEach(function(p){
	if(second.indexOf(p) == -1){
		inFirstNotInSecond.push(p);
	}
});

second.forEach(function(p){
	if(first.indexOf(p) === -1){
		inSecondNotInFirst.push(p);
	}
});

console.log('The following polyfills are in ' + alias1 + ' and not in ' + alias2);
inFirstNotInSecond.forEach(function(a){
	console.log(a);
});
console.log('        ');
console.log('The following polyfills are in ' + alias2 + ' and not in ' + alias1);
inSecondNotInFirst.forEach(function(a){
	console.log(a);
});
