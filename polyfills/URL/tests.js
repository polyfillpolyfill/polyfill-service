it('URL IDL', function () {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');

	expect(typeof url.protocol).to.be('string');
	expect(typeof url.hostname).to.be('string');
	expect(typeof url.port).to.be('string');
	expect(typeof url.host).to.be('string');
	expect(typeof url.pathname).to.be('string');
	expect(typeof url.search).to.be('string');
	expect(typeof url.hash).to.be('string');
	expect(typeof url.origin).to.be('string');
	expect(typeof url.href).to.be('string');
});

it('URL Stringifying', function () {
	expect(String(new URL('http://example.com'))).to.be('http://example.com/');
	expect(String(new URL('http://example.com:8080'))).to.be('http://example.com:8080/');
});

it('URL Parsing', function () {
	var url = new URL('http://example.com:8080/foo/bar?a=1&b=2#p1');

	expect(url.protocol).to.be('http:');
	expect(url.hostname).to.be('example.com');
	expect(url.port).to.be('8080');
	expect(url.host).to.be('example.com:8080');
	expect(url.pathname).to.be('/foo/bar');
	expect(url.search).to.be('?a=1&b=2');
	expect(url.hash).to.be('#p1');
	expect(url.origin).to.be('http://example.com:8080');
	expect(url.href).to.be('http://example.com:8080/foo/bar?a=1&b=2#p1');
});

it('URL Mutation', function () {
	var url = new URL('http://example.com');

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');
	expect(url.host).to.be('example.com');

	url.protocol = 'ftp';

	expect(url.protocol).to.be('ftp:');
	expect(url.href).to.be('ftp://example.com/');
	expect(url.origin).to.be('ftp://example.com');
	expect(url.host).to.be('example.com');

	url.protocol = 'http';

	expect(url.protocol).to.be('http:');
	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');
	expect(url.host).to.be('example.com');

	url = new URL('http://example.com')
	url.hostname = 'example.org';

	expect(url.href).to.be('http://example.org/');
	expect(url.origin).to.be('http://example.org');
	expect(url.host).to.be('example.org');

	url.hostname = 'example.com';

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');
	expect(url.host).to.be('example.com');

	url = new URL('http://example.com');
	url.port = 8080;

	expect(url.href).to.be('http://example.com:8080/');
	expect(url.origin).to.be('http://example.com:8080');
	expect(url.host).to.be('example.com:8080');

	url.port = 80;

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');
	expect(url.host).to.be('example.com');

	url = new URL('http://example.com');
	url.pathname = 'foo';

	expect(url.href).to.be('http://example.com/foo');
	expect(url.origin).to.be('http://example.com');

	url.pathname = 'foo/bar';

	expect(url.href).to.be('http://example.com/foo/bar');
	expect(url.origin).to.be('http://example.com');

	url.pathname = '';

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');

	url = new URL('http://example.com');
	url.search = 'a=1&b=2';

	expect(url.href).to.be('http://example.com/?a=1&b=2');
	expect(url.origin).to.be('http://example.com');

	url.search = '';

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');

	url = new URL('http://example.com');
	url.hash = 'p1';

	expect(url.href).to.be('http://example.com/#p1');
	expect(url.origin).to.be('http://example.com');

	url.hash = '';

	expect(url.href).to.be('http://example.com/');
	expect(url.origin).to.be('http://example.com');
});

it('Parameter Mutation', function () {
	var url = new URL('http://example.com');

	expect(url.href).to.be('http://example.com/');
	expect(url.search).to.be('');
	expect(url.searchParams.get('a')).to.be(null);
	expect(url.searchParams.get('b')).to.be(null);

	url.searchParams.append('a', '1');

	expect(url.searchParams.get('a')).to.be('1');
	expect(url.searchParams.getAll('a')).to.eql(['1']);
	expect(url.search).to.be('?a=1');
	expect(url.href).to.be('http://example.com/?a=1');

	url.searchParams.append('b', '2');

	expect(url.searchParams.get('b')).to.be('2');
	expect(url.searchParams.getAll('b')).to.be.eql(['2']);
	expect(url.search).to.be('?a=1&b=2')
	expect(url.href).to.be('http://example.com/?a=1&b=2');

	url.searchParams.append('a', '3');

	expect(url.searchParams.get('a')).to.be('1');
	expect(url.searchParams.getAll('a')).to.be.eql(['1', '3']);
	expect(url.search).to.be('?a=1&b=2&a=3');
	expect(url.href).to.be('http://example.com/?a=1&b=2&a=3');

	url.searchParams['delete']('a');

	expect(url.search).to.be('?b=2')
	expect(url.searchParams.getAll('a')).to.be.eql([]);
	expect(url.href).to.be('http://example.com/?b=2');

	url.searchParams['delete']('b');

	expect(url.searchParams.getAll('b')).to.be.eql([]);
	expect(url.href).to.be('http://example.com/');

	url.href = 'http://example.com?m=9&n=3';

	expect(url.searchParams.has('a')).to.be(false);
	expect(url.searchParams.has('b')).to.be(false);
	expect(url.searchParams.has('m')).to.be(true);
	expect(url.searchParams.has('n')).to.be(true);
	expect(url.searchParams.get('m')).to.be('9');
	expect(url.searchParams.get('n')).to.be('3');

	url.href = 'http://example.com';
	url.searchParams.set('a', '1');

	expect(url.searchParams.getAll('a')).to.be.eql(['1']);

	url.search = 'a=1&b=1&b=2&c=1';
	url.searchParams.set('b', '3');

	expect(url.searchParams.getAll('b')).to.be.eql(['3']);
	expect(url.href).to.be('http://example.com/?a=1&b=3&c=1');
});

it('Parameter Encoding', function () {
	var url = new URL('http://example.com');

	expect(url.href).to.be('http://example.com/');
	expect(url.search).to.be('');

	url.searchParams.append('this\x00&that\x7f\xff', '1+2=3');

	expect(url.searchParams.get('this\x00&that\x7f\xff'))
		.to.be('1+2=3');

	expect(url.search)
		.to.be('?this%00%26that%7F%C3%BF=1%2B2%3D3');

	expect(url.href)
		.to.be('http://example.com/?this%00%26that%7F%C3%BF=1%2B2%3D3');

	url.search = '';
	url.searchParams.append('a  b', 'a  b');

	expect(url.search).to.be('?a++b=a++b');
	expect(url.searchParams.get('a  b')).to.be('a  b');
});

it('Base URL', function () {
	// fully qualified URL
	expect(new URL('http://example.com', 'https://example.org').href)
		.to.be('http://example.com/');

	expect(new URL('http://example.com/foo/bar', 'https://example.org').href)
		.to.be('http://example.com/foo/bar');

	// protocol relative
	expect(new URL('//example.com', 'https://example.org').href)
		.to.be('https://example.com/');

	// path relative
	expect(new URL('/foo/bar', 'https://example.org').href)
		.to.be('https://example.org/foo/bar');

	expect(new URL('/foo/bar', 'https://example.org/baz/bat').href)
		.to.be('https://example.org/foo/bar');

	expect(new URL('./bar', 'https://example.org').href)
		.to.be('https://example.org/bar');

	expect(new URL('./bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/foo/bar');

	expect(new URL('bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/foo/bar');

	expect(new URL('../bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/bar');

	expect(new URL('../bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/bar');

	expect(new URL('../../bar', 'https://example.org/foo/baz/bat/').href)
		.to.be('https://example.org/foo/bar');

	expect(new URL('../../bar', 'https://example.org/foo/baz/bat').href)
		.to.be('https://example.org/bar');

	expect(new URL('../../bar', 'https://example.org/foo/baz/').href)
		.to.be('https://example.org/bar');

	expect(new URL('../../bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/bar');

	expect(new URL('../../bar', 'https://example.org/foo/').href)
		.to.be('https://example.org/bar');

	// search/hash relative
	expect(new URL('bar?ab#cd', 'https://example.org/foo/').href)
		.to.be('https://example.org/foo/bar?ab#cd');

	expect(new URL('bar?ab#cd', 'https://example.org/foo').href)
		.to.be('https://example.org/bar?ab#cd');

	expect(new URL('?ab#cd', 'https://example.org/foo').href)
		.to.be('https://example.org/foo?ab#cd');

	expect(new URL('?ab', 'https://example.org/foo').href)
		.to.be('https://example.org/foo?ab');

	expect(new URL('#cd', 'https://example.org/foo').href)
		.to.be('https://example.org/foo#cd');
});