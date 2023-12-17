/* eslint-env mocha */

"use strict";

import vm from "node:vm";

import assert from "node:assert";
import axios from "../helpers.js";

describe("OPTIONS /v3/polyfill.js", function() {

	it("responds with a 200 status", async () => {
		const response = await axios.options(`/v3/polyfill.js`);
		assert.equal(response.status, 200);
		assert.equal(response.headers.allow, "OPTIONS, GET, HEAD");
	});
});

describe("POST /v3/polyfill.js", function() {

	it("responds with a 405 status", async () => {
		const response = await axios.post(`/v3/polyfill.js`);
		assert.equal(response.status, 405);
	});
});

describe("DELETE /v3/polyfill.js", function() {

	it("responds with a 405 status", async () => {
		const response = await axios.delete(`/v3/polyfill.js`);
		assert.equal(response.status, 405);
	});
});

describe("GET /v3/polyfill.js", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.js`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET long-one", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.js?features=Element%2CElement.prototype.after%2CElement.prototype.animate%2CElement.prototype.append%2CElement.prototype.before%2CElement.prototype.classList%2CElement.prototype.cloneNode%2CElement.prototype.closest%2CElement.prototype.dataset%2CElement.prototype.getAttributeNames%2CElement.prototype.inert%2CElement.prototype.matches%2CElement.prototype.nextElementSibling%2CElement.prototype.placeholder%2CElement.prototype.prepend%2CElement.prototype.previousElementSibling%2CElement.prototype.remove%2CElement.prototype.replaceWith%2CElement.prototype.scroll%2CElement.prototype.scrollBy%2CElement.prototype.scrollIntoView%2CElement.prototype.toggleAttribute%2CEvent%2CEvent.focusin%2CEvent.hashchange%2CEventSource%2CFloat32Array%2CFloat64Array%2CFunction.name%2CFunction.prototype.bind%2CFunction.prototype.name%2CHTMLCanvasElement.prototype.toBlob%2CHTMLCanvasElement.protoype.toBlob%2CHTMLDocument%2CHTMLInputElement.prototype.valueAsDate%2CHTMLPictureElement%2CHTMLSelectElement.prototype.selectedOptions%2CHTMLTemplateElement%2CInt16Array%2CInt32Array%2CInt8Array%2CIntersectionObserver%2CIntersectionObserverEntry%2CIntl.DateTimeFormat%2CIntl.DateTimeFormat.prototype.formatToParts%2CIntl.DateTimeFormat.%7EtimeZone.all%2CIntl.DateTimeFormat.%7EtimeZone.golden%2CIntl.DisplayNames%2CIntl.ListFormat%2CIntl.Locale%2CIntl.NumberFormat%2CIntl.PluralRules%2CIntl.RelativeTimeFormat%2CIntl.getCanonicalLocales%2CJSON%2CMap%2CMath.acosh%2CMath.asinh%2CMath.atanh%2CMath.cbrt%2CMath.clz32%2CMath.cosh%2CMath.expm1%2CMath.fround%2CMath.hypot%2CMath.imul%2CMath.log10%2CMath.log1p%2CMath.log2%2CMath.sign%2CMath.sinh%2CMath.tanh%2CMath.trunc%2CMediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CMutationObserver%2CNavigator.prototype.geolocation%2CNode.prototype.contains%2CNode.prototype.isSameNode%2CNodeList.prototype.%40%40iterator%2CNodeList.prototype.forEach%2CNumber.EPSILON%2CNumber.Epsilon%2CNumber.MAX_SAFE_INTEGER%2CNumber.MIN_SAFE_INTEGER%2CNumber.isFinite%2CNumber.isInteger%2CNumber.isNaN%2CNumber.isSafeInteger%2CNumber.parseFloat%2CNumber.parseInt%2CObject.assign%2CObject.create%2CObject.defineProperties%2CObject.defineProperty%2CObject.entries%2CObject.freeze%2CObject.fromEntries%2CObject.getOwnPropertyDescriptor%2CObject.getOwnPropertyDescriptors%2CObject.getOwnPropertyNames%2CObject.getOwnPropertySymbols%2CObject.getPrototypeOf%2CObject.is%2CObject.isExtensible%2CObject.isFrozen%2CObject.isSealed%2CObject.keys%2CObject.preventExtensions%2CObject.seal%2CObject.setPrototypeOf%2CObject.values%2CPageVisibility%2CPromise%2CPromise.allSettled%2CPromise.any%2CPromise.prototype.finally%2CReflect%2CReflect.apply%2CReflect.construct%2CReflect.defineProperty%2CReflect.deleteProperty%2CReflect.get%2CReflect.getOwnPropertyDescriptor%2CReflect.getPrototypeOf%2CReflect.has%2CReflect.isExtensible%2CReflect.ownKeys%2CReflect.preventExtensions%2CReflect.set%2CReflect.setPrototypeOf%2CRegExp.prototype.%40%40matchAll%2CRegExp.prototype.flags%2CResizeObserver%2CSet%2CString.fromCodePoint%2CString.prototype.%40%40iterator%2CString.prototype.anchor%2CString.prototype.at%2CString.prototype.big%2CString.prototype.blink%2CString.prototype.bold%2CString.prototype.codePointAt%2CString.prototype.endsWith%2CString.prototype.fixed%2CString.prototype.fontcolor%2CString.prototype.fontsize%2CString.prototype.includes%2CString.prototype.italics%2CString.prototype.link%2CString.prototype.matchAll%2CString.prototype.normalize%2CString.prototype.padEnd%2CString.prototype.padStart%2CString.prototype.repeat%2CString.prototype.replaceAll%2CString.prototype.small%2CString.prototype.startsWith%2CString.prototype.strike%2CString.prototype.sub%2CString.prototype.sup%2CString.prototype.trim%2CString.prototype.trimEnd%2CString.prototype.trimStart%2CString.raw%2CSymbol%2CSymbol.asyncIterator%2CSymbol.for%2CSymbol.hasInstance%2CSymbol.isConcatSpreadable%2CSymbol.iterator%2CSymbol.keyFor%2CSymbol.match%2CSymbol.matchAll%2CSymbol.prototype.description%2CSymbol.replace%2CSymbol.search%2CSymbol.species%2CSymbol.split%2CSymbol.toPrimitive%2CSymbol.toStringTag%2CSymbol.unscopables%2CTextDecoder%2CTextEncoder%2CTypedArray.prototype.at%2CURL%2CURL.prototype.toJSON%2CURLSearchParams%2CUint16Array%2CUint32Array%2CUint8Array%2CUint8ClampedArray%2CUserTiming%2CWeakMap%2CWeakSet%2CWebAnimations%2CWindow%2CXMLHttpRequest%2Catob%2Cconsole%2Cconsole.assert%2Cconsole.clear%2Cconsole.count%2Cconsole.debug%2Cconsole.dir%2Cconsole.dirxml%2Cconsole.error%2Cconsole.exception%2Cconsole.group%2Cconsole.groupCollapsed%2Cconsole.groupEnd%2Cconsole.info%2Cconsole.log%2Cconsole.markTimeline%2Cconsole.profile%2Cconsole.profileEnd%2Cconsole.profiles%2Cconsole.table%2Cconsole.time%2Cconsole.timeEnd%2Cconsole.timeStamp%2Cconsole.timeline%2Cconsole.timelineEnd%2Cconsole.trace%2Cconsole.warn%2Ccss_fq%2CdevicePixelRatio%2Cdocument%2Cdocument.currentScript%2Cdocument.elementsFromPoint%2Cdocument.getElementsByClassName%2Cdocument.head%2Cdocument.querySelector%2Cdocument.visibilityState%2Cfetch%2CgetComputedStyle%2CglobalThis%2Chtml5shiv%2CinnerHeight%2CinnerWidth%2ClocalStorage%2Clocation.origin%2CmatchMedia%2Cnavigator.geolocation%2Cnavigator.sendBeacon%2CpageXOffset%2CpageYOffset%2Cperformance.now%2CqueueMicrotask%2CrequestAnimationFrame%2CrequestIdleCallback%2Cscreen.orientation%2Cscroll%2CscrollBy%2CscrollIntoView%2CscrollX%2CscrollY%2CsetImmediate%2Csmoothscroll%2Cviewport%2Cwindow.scroll%2Cwindow.scrollBy%2C%7Ehtml5-elements%2C%7Eviewport`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/javascript; charset=UTF-8")
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v3/polyfill.js?features=carrot&strict", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.js?features=carrot&strict`,{
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

describe("GET /v3/polyfill.js?callback=AAA&callback=BBB", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/v3/polyfill.js?callback=AAA&callback=BBB`, {
			headers: {
				"Fastly-Debug": "true"
			},
			decompress: true
		});

		assert.equal(response.status, 200);
		assert.match(response.headers['content-type'], /text\/javascript; charset=(utf|UTF)-8/)
		assert.equal(response.headers["access-control-allow-origin"], "*")
		assert.equal(response.headers["access-control-allow-methods"], "GET,HEAD,OPTIONS")
		assert.equal(response.headers["cache-control"], "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
		assert.ok(typeof response.data === 'string');
		assert.doesNotThrow(() => {
			try {
				new vm.Script(response.data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		});
		assert.doesNotMatch(response.data, /\/\/#\ssourceMappingURL(.+)/);
	});
});

// describe("encoding", function() {
// 	it("responds with no compression if client does not accept compressed responses", async () => {
// 		const response = await axios.get(`/v3/polyfill.js`,{
// 			headers: {
// 				"Fastly-Debug": "true",
// 				"Accept-Encoding": "identity"
// 			}
// 		});

// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 		assert.equal(response.headers["content-encoding"], undefined)
// 	});

// 	it("responds with gzip compression if client accepts gzip compressed responses", async() => {
// 		const response = await axios.get(`/v3/polyfill.js`,{
// 			headers: {
// 				"Fastly-Debug": "true",
// 				"accept-encoding": "gzip"
// 			}
// 		});

// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 		assert.equal(response.headers["content-encoding"], "gzip")
// 	});

// 	it("responds with gzip compression if client accepts gzip and deflate compressed responses", async () => {
// 		const response = await axios.get(`/v3/polyfill.js`, {
// 			headers: {
// 				"Fastly-Debug": "true",
// 				"Accept-Encoding": "gzip, deflate"
// 			}
// 		});

// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 		assert.equal(response.headers["content-encoding"], "gzip")
// 	});

// 	it("responds with brotli compression if client accepts brotli compressed responses", async () => {
// 		const response = await axios.get(`/v3/polyfill.js`,{
// 			headers: {
// 				"Fastly-Debug": "true",
// 				"Accept-Encoding": "br"
// 			}
// 		});

// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 		assert.equal(response.headers["content-encoding"], "br")
// 	});

// 	it("responds with brotli compression if client accepts brotli and gzip compressed responses", async () => {
// 		const response = await axios.get(`/v3/polyfill.js`,{
// 			headers: {
// 				"Fastly-Debug": "true",
// 				"Accept-Encoding": "br, gzip"
// 			}
// 		});

// 		assert.equal(response.status, 200);
// 		assert.equal(response.headers["vary"], "User-Agent, Accept-Encoding")
// 		assert.equal(response.headers["content-encoding"], "br")
// 	});
// });