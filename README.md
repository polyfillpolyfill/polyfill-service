polyfill
========

**polyfill** makes web development less frustrating by polyfilling as much javascript functionality in the browser as it can.

This service can be used on HTTP and HTTPS connections.

```html
<script src="//polyfill.io"></script>
```

*Whoa, where's the script file?*

The script file *is* the domain.

Give document.querySelector to IE6+.

```js
var el = document.querySelector(".foo.bar");
```

Use matchesSelector without a vendor prefix. 

```js
el.matchesSelector(".bar");
```

Have HTML5 elements work in old IE and style correctly in all browsers.

```html
<main>I am block!</main>
```
