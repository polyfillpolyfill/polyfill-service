polyfill
========

**polyfill** makes web development less frustrating by polyfilling as much javascript functionality in the browser as it can.

This service is also provided on HTTP and HTTPS. 

```html
<script src="//polyfill.io"></script>
```

Then, have some fun.

```js
var el = document.querySelector(".foo.bar"); // works in IE6+
```

```
el.matchesSelector(".bar"); // works without vendor prefixes
```
