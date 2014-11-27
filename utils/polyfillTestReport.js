var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');

//

function getAllPolyfills(polyfillRootPath){
	try{
		var files = fs.readdirSync(polyfillRootPath);
		var polyfills = [];

		files.forEach(function(file){
			var testPath = path.resolve(polyfillRootPath, file + '/tests.js');
			var fullPath = path.resolve(polyfillRootPath, file + '/polyfill.js');
			if(fs.existsSync(fullPath)){
				polyfills.push({name: file, hasTests : fs.existsSync(testPath)});
			}
		});

		return polyfills;
	}catch(e){
		fail(e);
	}
}


function sort(polyfills){
	var hasTests = [], noTests = [];
	polyfills.forEach(function(polyfill){
		if(polyfill.hasTests){
			hasTests.push(polyfill);
		}else{
			noTests.push(polyfill);
		}
	});

	return { hasTests : hasTests, noTests : noTests};
}

function output(polyfills){
	console.log('POLYFILLS WITH TESTS (' + polyfills.hasTests.length + ')');
	console.log('=====================');
	polyfills.hasTests.forEach(function(polyfill){
		console.log(polyfill.name);
	});
	console.log('                     ');
	console.log('POLYFILLS WITHOUT TESTS (' + polyfills.noTests.length + ')');
	console.log('=====================');
	polyfills.noTests.forEach(function(polyfill){
		console.log(polyfill.name);
	});
}

function writeToFile(polyFills, file){
	fs.writeFileSync(file, JSON.stringify(polyFills, null, 2), {encoding:'utf8'});
}

function fail(err){
	throw err;
}


function main(silent){
	if(typeof silent === 'undefined'){
		silent = true;
	}

	var polyfillRootPath = path.resolve(__dirname, '../', 'polyfills/');
	var polyfills = getAllPolyfills(polyfillRootPath);
	polyfills = sort(polyfills);
	if(!silent){
		output(polyfills);
		writeToFile(polyfills, 'polyfillTestReport.json');
	}else{
		return polyfills;
	}
}

if(require.main === module) {
	main(false);
} else {
	module.exports = main;
}
