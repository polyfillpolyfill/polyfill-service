/* eslint-env mocha, browser */
/* global proclaim */

it('URL IDL', function () {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');
	proclaim.equal(typeof url.protocol, 'string', 'protocol');
	proclaim.equal(typeof url.host, 'string', 'host');
	proclaim.equal(typeof url.hostname, 'string', 'hostname');
	proclaim.equal(typeof url.port, 'string', 'port');
	proclaim.equal(typeof url.pathname, 'string', 'pathname');
	proclaim.equal(typeof url.search, 'string', 'search');
	proclaim.equal(typeof url.hash, 'string', 'hash');
	proclaim.equal(typeof url.origin, 'string', 'origin');
	proclaim.equal(typeof url.href, 'string', 'href');
});

it('URL Stringifying', function() {
	proclaim.equal(String(new URL('http://example.com')), 'http://example.com/');
	proclaim.equal(String(new URL('http://example.com:8080')), 'http://example.com:8080/');
});

it('URL Parsing', function () {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');
	proclaim.equal(url.protocol, 'http:');
	proclaim.equal(url.hostname, 'example.com');
	proclaim.equal(url.port, '8080');
	proclaim.equal(url.host, 'example.com:8080');
	proclaim.equal(url.pathname, '/foo/bar');
	proclaim.equal(url.search, '?a=1&b=2');
	proclaim.equal(url.hash, '#p1');
	proclaim.equal(url.origin, 'http://example.com:8080');
	proclaim.equal(url.href, 'http://example.com:8080/foo/bar?a=1&b=2#p1');
});

it('URL Mutation', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url.protocol = 'ftp';
	proclaim.equal(url.protocol, 'ftp:');
	proclaim.equal(url.href, 'ftp://example.com/');

	// Fails in native IE13 (Edge)
	// Probable bug in IE.  https://twitter.com/patrickkettner/status/768726160070934529
	//proclaim.equal(url.origin, 'ftp://example.com');

	proclaim.equal(url.host, 'example.com');
	url.protocol = 'http';
	proclaim.equal(url.protocol, 'http:');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.hostname = 'example.org';
	proclaim.equal(url.href, 'http://example.org/');
	proclaim.equal(url.origin, 'http://example.org');
	proclaim.equal(url.host, 'example.org');
	url.hostname = 'example.com';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.port = 8080;
	proclaim.equal(url.href, 'http://example.com:8080/');
	proclaim.equal(url.origin, 'http://example.com:8080');
	proclaim.equal(url.host, 'example.com:8080');
	url.port = 80;
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com');
	url.pathname = 'foo';
	proclaim.equal(url.href, 'http://example.com/foo');
	proclaim.equal(url.origin, 'http://example.com');
	url.pathname = 'foo/bar';
	proclaim.equal(url.href, 'http://example.com/foo/bar');
	proclaim.equal(url.origin, 'http://example.com');
	url.pathname = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');

	url = new URL('http://example.com');
	url.search = 'a=1&b=2';
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2');
	proclaim.equal(url.origin, 'http://example.com');
	url.search = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');

	url = new URL('http://example.com');
	url.hash = 'p1';
	proclaim.equal(url.href, 'http://example.com/#p1');
	proclaim.equal(url.origin, 'http://example.com');
	url.hash = '';
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
});

it('Parameter Mutation', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.search, '');
	proclaim.equal(url.searchParams.get('a'), null);
	proclaim.equal(url.searchParams.get('b'), null);

	url.searchParams.append('a', '1');
	proclaim.equal(url.searchParams.get('a'), '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1']);
	proclaim.equal(url.search, '?a=1');
	proclaim.equal(url.href, 'http://example.com/?a=1');

	url.searchParams.append('b', '2');
	proclaim.equal(url.searchParams.get('b'), '2');
	proclaim.deepEqual(url.searchParams.getAll('b'), ['2']);
	proclaim.equal(url.search, '?a=1&b=2');
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2');

	url.searchParams.append('a', '3');
	proclaim.equal(url.searchParams.get('a'), '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1', '3']);
	proclaim.equal(url.search, '?a=1&b=2&a=3');
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2&a=3');

	url.searchParams['delete']('a');
	proclaim.equal(url.search, '?b=2');
	proclaim.deepEqual(url.searchParams.getAll('a'), []);
	proclaim.equal(url.href, 'http://example.com/?b=2');

	url.searchParams['delete']('b');
	proclaim.deepEqual(url.searchParams.getAll('b'), []);
	proclaim.equal(url.href, 'http://example.com/');

	url.href = 'http://example.com?m=9&n=3';
	proclaim.equal(url.searchParams.has('a'), false);
	proclaim.equal(url.searchParams.has('b'), false);
	proclaim.equal(url.searchParams.get('m'), 9);
	proclaim.equal(url.searchParams.get('n'), 3);

	url.href = 'http://example.com';
	url.searchParams.set('a', '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1']);
	url.search = 'a=1&b=1&b=2&c=1';
	url.searchParams.set('b', '3');
	proclaim.deepEqual(url.searchParams.getAll('b'), ['3']);
	proclaim.equal(url.href, 'http://example.com/?a=1&b=3&c=1');
});

it('Parameter Encoding', function () {
	var url = new URL('http://example.com');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.search, '');
	url.searchParams.append('this\x00&that\x7f\xff', '1+2=3');
	proclaim.equal(url.searchParams.get('this\x00&that\x7f\xff'), '1+2=3');

	// The following fail in FF (tested in 38) against native impl
	//proclaim.equal(url.search, '?this%00%26that%7F%C3%BF=1%2B2%3D3');
	//proclaim.equal(url.href, 'http://example.com/?this%00%26that%7F%C3%BF=1%2B2%3D3');

	url.search = '';
	url.searchParams.append('a  b', 'a  b');
	proclaim.equal(url.search, '?a++b=a++b');
	proclaim.equal(url.searchParams.get('a  b'), 'a  b');
});


it('Base URL', function () {
	// fully qualified URL
	proclaim.equal(new URL('http://example.com', 'https://example.org').href, 'http://example.com/');
	proclaim.equal(new URL('http://example.com/foo/bar', 'https://example.org').href, 'http://example.com/foo/bar');

	// protocol relative
	proclaim.equal(new URL('//example.com', 'https://example.org').href, 'https://example.com/');

	// path relative
	proclaim.equal(new URL('/foo/bar', 'https://example.org').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('/foo/bar', 'https://example.org/baz/bat').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('./bar', 'https://example.org').href, 'https://example.org/bar');
	proclaim.equal(new URL('./bar', 'https://example.org/foo/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('bar', 'https://example.org/foo/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/bat/').href, 'https://example.org/foo/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/bat').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/baz/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/').href, 'https://example.org/bar');
	proclaim.equal(new URL('../../bar', 'https://example.org/foo/').href, 'https://example.org/bar');

	// search/hash relative
	proclaim.equal(new URL('bar?ab#cd', 'https://example.org/foo/').href, 'https://example.org/foo/bar?ab#cd');
	proclaim.equal(new URL('bar?ab#cd', 'https://example.org/foo').href, 'https://example.org/bar?ab#cd');
	proclaim.equal(new URL('?ab#cd', 'https://example.org/foo').href, 'https://example.org/foo?ab#cd');
	proclaim.equal(new URL('?ab', 'https://example.org/foo').href, 'https://example.org/foo?ab');
	proclaim.equal(new URL('#cd', 'https://example.org/foo').href, 'https://example.org/foo#cd');
});

it('URLSearchParams', function () {
	var url = new URL('http://example.com?a=1&b=2');
	proclaim.ok(url.searchParams instanceof URLSearchParams);

	proclaim.equal(String(new URLSearchParams()), '');
	proclaim.equal(String(new URLSearchParams('')), '');
	proclaim.equal(String(new URLSearchParams('a=1')), 'a=1');
	proclaim.equal(String(new URLSearchParams('a=1&b=1')), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams('a=1&b&a')), 'a=1&b=&a=');

	// The following fail in FF (tested in 38) against native impl
	// but FF38 passes the detect
	/*
	proclaim.equal(String(new URLSearchParams('?')), '');
	proclaim.equal(String(new URLSearchParams('?a=1')), 'a=1');
	proclaim.equal(String(new URLSearchParams('?a=1&b=1')), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams('?a=1&b&a')), 'a=1&b=&a=');

	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?'))), '');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1'))), 'a=1');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1&b=1'))), 'a=1&b=1');
	proclaim.equal(String(new URLSearchParams(new URLSearchParams('?a=1&b&a'))), 'a=1&b=&a=');
	*/
});

it('URLSearchParams mutation', function () {
	var p = new URLSearchParams();
	proclaim.equal(p.get('a'), null);
	proclaim.equal(p.get('b'), null);

	p.append('a', '1');
	proclaim.equal(p.get('a'), '1');
	proclaim.deepEqual(p.getAll('a'), ['1']);
	proclaim.equal(String(p), 'a=1');

	p.append('b', '2');
	proclaim.equal(p.get('b'), '2');
	proclaim.deepEqual(p.getAll('b'), ['2']);
	proclaim.equal(String(p), 'a=1&b=2');

	p.append('a', '3');
	proclaim.equal(p.get('a'), '1');
	proclaim.deepEqual(p.getAll('a'), ['1', '3']);
	proclaim.equal(String(p), 'a=1&b=2&a=3');

	p['delete']('a');
	proclaim.equal(String(p), 'b=2');
	proclaim.deepEqual(p.getAll('a'), []);

	p['delete']('b');
	proclaim.deepEqual(p.getAll('b'), []);

	p = new URLSearchParams('m=9&n=3');
	proclaim.equal(p.has('a'), false);
	proclaim.equal(p.has('b'), false);
	proclaim.equal(p.get('m'), 9);
	proclaim.equal(p.get('n'), 3);

	p = new URLSearchParams();
	p.set('a', '1');
	proclaim.deepEqual(p.getAll('a'), ['1']);
	p = new URLSearchParams('a=1&b=1&b=2&c=1');
	p.set('b', '3');
	proclaim.deepEqual(p.getAll('b'), ['3']);
	proclaim.equal(String(p), 'a=1&b=3&c=1');

	// Ensure copy constructor copies by value, not reference.
	var sp1 = new URLSearchParams('a=1');
	proclaim.equal(String(sp1), 'a=1');
	var sp2 = new URLSearchParams(sp1);
	proclaim.equal(String(sp2), 'a=1');
	sp1.append('b', '2');
	sp2.append('c', '3');
	proclaim.equal(String(sp1), 'a=1&b=2');
	proclaim.equal(String(sp2), 'a=1&c=3');
});

// The following fail in FF (tested in 38) against native impl
// but FF38 passes the detect
/*
it('URLSearchParams serialization', function() {
	var p = new URLSearchParams();
	p.append('this\x00&that\x7f\xff', '1+2=3');
	proclaim.equal(p.get('this\x00&that\x7f\xff'), '1+2=3');
	proclaim.equal(String(p), 'this%00%26that%7F%C3%BF=1%2B2%3D3');
	p = new URLSearchParams();
	p.append('a  b', 'a  b');
	proclaim.equal(String(p), 'a++b=a++b');
	proclaim.equal(p.get('a  b'), 'a  b');
});

it('URLSearchParams iterable methods', function () {
	var params = new URLSearchParams('a=1&b=2');
	proclaim.deepEqual(toArray(params.entries()), [['a', '1'], ['b', '2']]);
	proclaim.deepEqual(toArray(params.keys()), ['a', 'b']);
	proclaim.deepEqual(toArray(params.values()), ['1', '2']);

	if ('Symbol' in self && 'iterator' in self.Symbol) {
		proclaim.deepEqual(toArray(params[Symbol.iterator]()), [['a', '1'], ['b', '2']]);
	}
});
*/

// Not implemented by the polyfill!
/*
it('URL contains native static methods', function () {
		proclaim.ok(typeof URL.createObjectURL == 'function');
		proclaim.ok(typeof URL.revokeObjectURL == 'function');
});
*/

it('Regression tests', function() {
	// IE mangles the pathname when assigning to search with 'about:' URLs
	var p = new URL('about:blank').searchParams;
	p.append('a', 1);
	p.append('b', 2);
	proclaim.equal(p.toString(), 'a=1&b=2');
});
