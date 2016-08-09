/* eslint-env mocha, browser*/
/* global proclaim, it */

it('URL IDL', function () {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');

	proclaim.equal(typeof url.protocol, 'string');
	proclaim.equal(typeof url.hostname, 'string');
	proclaim.equal(typeof url.port, 'string');
	proclaim.equal(typeof url.host, 'string');
	proclaim.equal(typeof url.pathname, 'string');
	proclaim.equal(typeof url.search, 'string');
	proclaim.equal(typeof url.hash, 'string');
	proclaim.equal(typeof url.origin, 'string');
	proclaim.equal(typeof url.href, 'string');
});

it('URL Stringifying', function () {
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
	proclaim.equal(url.origin, 'ftp://example.com');
	proclaim.equal(url.host, 'example.com');

	url.protocol = 'http';

	proclaim.equal(url.protocol, 'http:');
	proclaim.equal(url.href, 'http://example.com/');
	proclaim.equal(url.origin, 'http://example.com');
	proclaim.equal(url.host, 'example.com');

	url = new URL('http://example.com')
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
	proclaim.equal(url.search, '?a=1&b=2')
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2');

	url.searchParams.append('a', '3');

	proclaim.equal(url.searchParams.get('a'), '1');
	proclaim.deepEqual(url.searchParams.getAll('a'), ['1', '3']);
	proclaim.equal(url.search, '?a=1&b=2&a=3');
	proclaim.equal(url.href, 'http://example.com/?a=1&b=2&a=3');

	url.searchParams['delete']('a');

	proclaim.equal(url.search, '?b=2')
	proclaim.deepEqual(url.searchParams.getAll('a'), []);
	proclaim.equal(url.href, 'http://example.com/?b=2');

	url.searchParams['delete']('b');

	proclaim.deepEqual(url.searchParams.getAll('b'), []);
	proclaim.equal(url.href, 'http://example.com/');

	url.href = 'http://example.com?m=9&n=3';

	proclaim.equal(url.searchParams.has('a'), false);
	proclaim.equal(url.searchParams.has('b'), false);
	proclaim.equal(url.searchParams.has('m'), true);
	proclaim.equal(url.searchParams.has('n'), true);
	proclaim.equal(url.searchParams.get('m'), '9');
	proclaim.equal(url.searchParams.get('n'), '3');

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
