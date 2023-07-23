import {ConfigStore} from 'fastly:config-store';
var humanize = (times) => {
	const [delimiter, separator] = [",", "."];
	const orderTimes = times.map((v) => v.replaceAll(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + delimiter));
	return orderTimes.join(separator);
};
var time = (start) => {
	const delta = Date.now() - start;
	return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
};
var colorStatus = (status) => {
	const out = {
		7: `\u001B[35m${status}\u001B[0m`,
		5: `\u001B[31m${status}\u001B[0m`,
		4: `\u001B[33m${status}\u001B[0m`,
		3: `\u001B[36m${status}\u001B[0m`,
		2: `\u001B[32m${status}\u001B[0m`,
		1: `\u001B[32m${status}\u001B[0m`,
		0: `\u001B[33m${status}\u001B[0m`
	};
	const calculateStatus = Math.trunc(status / 100);
	return out[calculateStatus];
};

function log(function_, prefix, method, url, status = 0, elapsed) {
	const out = prefix.startsWith("<--") /* Incoming */ ? `  ${prefix} ${method} ${url}` : `  ${prefix} ${method} ${url} ${colorStatus(status)} ${elapsed}`;
	function_(out);
}
var logger = (function_ = console.log) => {
	return async (c, next) => {
		const {
			method
		} = c.req;
		const url = c.req.url;
		let start = Date.now();
		if (shouldLog()) {
			log(function_, `<-- (Incoming) FASTLY_SERVICE_VERSION: ${fastly.env.get('FASTLY_SERVICE_VERSION')}` /* Incoming */ , method, url);
			await next();
		} else {
			await next();
		}
		if (shouldLog() || c.error) {
			log(function_, `--> (Outgoing) FASTLY_SERVICE_VERSION: ${fastly.env.get('FASTLY_SERVICE_VERSION')}` /* Outgoing */ , method, url, c.res.status, time(start));
		}
	};
};

function shouldLog() {
	const config = new ConfigStore('config');
	return config.get('log') === '1';
}
export {
	shouldLog,
	logger
};
