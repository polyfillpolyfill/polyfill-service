var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');

//

function getAllPolyfills(polyfillRootPath){
	try{
		var files = fs.readdirSync(polyfillRootPath);
		var polyfills = [];

		files.forEach(function(file){
			var folderPath = path.resolve(polyfillRootPath, file);
			var fullPaths = fs.readdirSync(folderPath).filter(function(p){
				return (p.indexOf('polyfill') > -1);
			});

			fullPaths.forEach(function(p){
				var subname = p.indexOf('-') > -1 ? '(' + p.split('-')[1].replace('.js', '') + ')' : '';
				if(subname === '' && fullPaths.length > 1){
					subname = '(default)'
				}
				var name = file + ' ' + subname;
				polyfills.push({name:name, src: fs.readFileSync(folderPath + '/' + p, {encoding:'utf8'})});
			});
		});

		return polyfills;
	}catch(e){
		fail(e);
	}
}

function minifyPolyfills(polyfills){
	polyfills.forEach(function(polyfill){
		polyfill.minified = UglifyJS.minify(polyfill.src, {fromString: true});
		delete polyfill.src;
	});

	return polyfills;
}

function calculateSizes(polyfills){
	polyfills.forEach(function(polyfill){
		polyfill.size = (Buffer.byteLength(polyfill.minified.code, 'utf8') / 1024).toFixed(2);
		delete polyfill.minified;
	});

	return polyfills;
}

function sort(polyfills){
	return polyfills.sort(function(a, b){
		return b.size - a.size;
	});
}

function output(polyfills){
	var over1k = true;
	polyfills.forEach(function(polyfill, i){
		if(over1k && polyfill.size < 1 && i > 0){
			console.log('**************************');
			over1k = false;
		}
		if(polyfill.size > 0){
			console.log(polyfill.name + '     ' + polyfill.size + 'K');
		}
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
	polyfills = minifyPolyfills(polyfills);
	polyfills = calculateSizes(polyfills);
	polyfills = sort(polyfills);
	if(!silent){
		output(polyfills);
		writeToFile(polyfills, 'polyfillsizes.json');
	}else{
		return polyfills;
	}
}

if(require.main === module) {
	main(false);
} else {
	module.exports = main;
}
