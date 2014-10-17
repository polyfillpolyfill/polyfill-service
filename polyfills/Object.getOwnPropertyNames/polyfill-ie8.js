(function (constructors) {
	'Array:length constructor toString toLocaleString join pop push concat reverse shift unshift slice splice sort,Date:constructor toString toDateString toTimeString toLocaleString toLocaleDateString toLocaleTimeString valueOf getTime getFullYear getUTCFullYear getMonth getUTCMonth getDate getUTCDate getDay getUTCDay getHours getUTCHours getMinutes getUTCMinutes getSeconds getUTCSeconds getMilliseconds getUTCMilliseconds getTimezoneOffset setTime setMilliseconds setUTCMilliseconds setSeconds setUTCSeconds setMinutes setUTCMinutes setHours setUTCHours setDate setUTCDate setMonth setUTCMonth setFullYear setUTCFullYear toGMTString toUTCString getYear setYear toJSON,Element:constructor,Function:length constructor toString call apply,Object:constructor toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable,RegExp:multiline,'.replace(/(.+?):(.+?),/g, function (match, constructorName, list) {
		for (var type = constructors['[object ' + constructorName + ']'] = {}, names = list.split(' '), index = 0, name; (name = names[index]); ++index) {
			type[0 + name] = true;
		}
	});

	Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
		var type = constructors[constructors.toString.call(object)], keys = [], key;

		for (key in type) {
			key = key.slice(1);

			if (key in object) {
				keys.push(key);
			}
		}

		for (key in object) {
			if (!(0 + key in type)) {
				keys.push(key);
			}
		}

		return keys;
	};
})({});
