polyfill
========

**polyfill** makes web development less frustrating by polyfilling as much javascript functionality in the browser as it can.

This service is also provided on HTTP and HTTPS. 

```html
<script src="//polyfill.io"></script>
```

How about document.querySelector for IE6+.

```js
var el = document.querySelector(".foo.bar");
```

Or matchesSelector without a vendor prefix. 

```js
el.matchesSelector(".bar"); // works without vendor prefixes
```

HTML5 elements work in old IE and style correctly in all browsers.

```html
<main>Hello World!</main>
```
