var fs = require('fs');
var path = require('path');

function getAllPolyfills(polyfillRootPath){
	try{
		var files = fs.readdirSync(polyfillRootPath);
		var polyfills = [];

		files.forEach(function(file){
			var basePath = path.resolve(polyfillRootPath, file);
			var fullPath = basePath + '/polyfill.js';
			var configPath = basePath + '/config.json';
			var polyfill = {};
			if(fs.existsSync(fullPath)){
				polyfill.name = file;
				polyfill.path = basePath;
				polyfill.configPath = configPath;
			}

			if(fs.existsSync(configPath)){
				polyfill.config = require(configPath);
			}

			polyfills.push(polyfill);
		});

		return polyfills;
	}catch(e){
		fail(e);
	}
}

function getPolyfillAlisas(polyfill){
	return (polyfill.config && polyfill.config.aliases) ? polyfill.config.aliases : [];
}

function polyfillInAlias(alias, polyfill){
	return getPolyfillAlisas(polyfill).indexOf(alias) > -1;
}

function savePolyfillConfig(polyfill){
	fs.writeFileSync(polyfill.configPath, JSON.stringify(polyfill.config, null, 2), {encoding:'utf8'});
}

function removeAlias(polyfill, alias){
	if(!polyfill.config || !polyfill.config.aliases){
		return;
	}

	var index = polyfill.config.aliases.indexOf(alias);
	if(index < 0){
		return;
	}

	polyfill.config.aliases.splice(index,1);
	savePolyfillConfig(polyfill);
}

function addAlias(polyfill, alias){
	if(!polyfill.config.aliases){
		polyfill.config.aliases = [];
	}

	if(polyfill.config.aliases.indexOf(alias) > -1){
		return;
	}

	polyfill.config.aliases.push(alias);
	savePolyfillConfig(polyfill);
}

function syncWithList(polyfill, list, alias){
	if(list.indexOf(polyfill.name) > -1){
		addAlias(polyfill, alias);
	}else{
		removeAlias(polyfill, alias);
	}
}

function loadPolyfillList(p){
	return fs.readFileSync(path.resolve(process.cwd(), p), {encoding:'utf8'}).split('\n');
}

function main(alias, listPath, silent){
	var polyfillList = loadPolyfillList(listPath);
	var polyfillRootPath = path.resolve(__dirname, '../', 'polyfills/');
	var polyfills = getAllPolyfills(polyfillRootPath);
	polyfills.forEach(function(polyfill){
		syncWithList(polyfill, polyfillList, alias);
	});

	if(!silent){
		console.log('Finished!');
	}
}

if(require.main === module){
	var alias = process.argv[2];
	var p = process.argv[3];
	main(alias, p, false);
}else{
	module.exports = main;
}

