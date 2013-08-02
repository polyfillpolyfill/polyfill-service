# polyfill

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. It can also be used as a service over HTTP and HTTPS connections.

```html
<script src="//polyfill.io"></script>
```

Whoa, where's the script file?

The script file [*is* the domain](https://polyfill.io).

## What does it do?

A lot. For instance, you can use querySelectors in IE6.

```js
var el = document.querySelector(".foo.bar");
```

Or use matches or matchesSelector without a vendor prefix. 

```js
el.matches(".bar");
```

The script is clean, compressed, and aggressively cached.

## What browsers are you supporting?

Android 2.2+, Blackberry 7+, Chrome, Opera 11.5+, Opera Mini 5+, Opera Mobile 10+, Firefox 3.6+, Internet Explorer 6+, Safari 4+, and Safari IOS 4+.

## What functionality are you polyfilling?

You should be able to use all of the following features to a reasonable extent in every supported browser.

### HTML5 Elements

`abbr` `article` `aside` `audio` `bdi` `canvas` `data` `datalist` `details` `figcaption` `figure` `footer` `header` `hgroup` `main` `mark` `meter` `nav` `output` `progress` `section` `subline` `summary` `time` `video`

Default HTML5 element styling is covered too, with [the experimental .css query](https://polyfill.io?.css).

```html
<link href="//polyfill.io?.css" rel="stylesheet">
```

### Array

* [Array.isArray](http://kangax.github.io/es5-compat-table/#Array.isArray)
* [Array.prototype.every](http://kangax.github.io/es5-compat-table/#Array.prototype.every)
* [Array.prototype.filter](http://kangax.github.io/es5-compat-table/#Array.prototype.filter)
* [Array.prototype.forEach](http://kangax.github.io/es5-compat-table/#Array.prototype.forEach)
* [Array.prototype.indexOf](http://kangax.github.io/es5-compat-table/#Array.prototype.indexOf)
* [Array.prototype.lastIndexOf](http://kangax.github.io/es5-compat-table/#Array.prototype.lastIndexOf)
* [Array.prototype.map](http://kangax.github.io/es5-compat-table/#Array.prototype.map)
* [Array.prototype.reduce](http://kangax.github.io/es5-compat-table/#Array.prototype.reduce)
* [Array.prototype.reduceRight](http://kangax.github.io/es5-compat-table/#Array.prototype.reduceRight)
* [Array.prototype.some](http://kangax.github.io/es5-compat-table/#Array.prototype.some)

### Object

* [Object.create](http://kangax.github.io/es5-compat-table/#Object.create)
* [Object.defineProperty](http://kangax.github.io/es5-compat-table/#Object.defineProperty)
* [Object.defineProperties](http://kangax.github.io/es5-compat-table/#Object.defineProperties)
* [Object.getOwnPropertyNames](http://kangax.github.io/es5-compat-table/#Object.getOwnPropertyNames)
* [Object.getPrototypeOf](http://kangax.github.io/es5-compat-table/#Object.getPrototypeOf)
* [Object.is](http://kangax.github.io/es5-compat-table/#Object.is)
* [Object.keys](http://kangax.github.io/es5-compat-table/#Object.keys)

### Other

* [Date.now](http://kangax.github.io/es5-compat-table/#Date.now)
* [Date.prototype.toISOString](http://kangax.github.io/es5-compat-table/#Date.prototype.toISOString)
* [Function.prototype.bind](http://kangax.github.io/es5-compat-table/#Function.prototype.bind)
* [String.prototype.trim](http://kangax.github.io/es5-compat-table/#String.prototype.trim)

### Selectors

* [Element.prototype.querySelector / Element.prototype.querySelectorAll](http://caniuse.com/querySelector)
* [Element.prototype.matches / matchesSelector](http://caniuse.com/matches)
* [Element.prototype.getElementsByClassName](getElementsByClassName)

### Mutations

* [Element.prototype.prepend](http://dom.spec.whatwg.org/#dom-parentnode-prepend)
* [Element.prototype.append](http://dom.spec.whatwg.org/#dom-parentnode-append)
* [Element.prototype.before](http://dom.spec.whatwg.org/#dom-childnode-before)
* [Element.prototype.after](http://dom.spec.whatwg.org/#dom-childnode-after)
* [Element.prototype.remove](http://dom.spec.whatwg.org/#dom-childnode-remove)
* [Element.prototype.replace](http://dom.spec.whatwg.org/#dom-childnode-replace)

### Event

* [Element.prototype.addEventListener / Element.prototype.removeEventListener / Element.prototype.dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Browser_Compatibility)
* [new Event / new CustomEvent](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Creating_and_triggering_events)
* [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMContentLoaded#Browser_compatibility)
* [hashchange](http://caniuse.com/hashchange)

### Goodies

* [Window.prototype.localStorage](http://caniuse.com/localStorage)
* [Window.prototype.getComputedStyle](http://caniuse.com/getComputedStyle)
* [Navigator.prototype.geolocation](http://caniuse.com/geolocation)
* [Element.prototype.classList](http://caniuse.com/classList)
* [Element.prototype.hasAttribute](https://developer.mozilla.org/en-US/docs/Web/API/element.hasAttribute)
* [Element.prototype.placeholder](http://caniuse.com/input-placeholder)

### Window

* [Window.prototype.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/window.innerHeight)
* [Window.prototype.innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/window.innerWidth)
* [Window.prototype.scrollX / Window.prototype.pageXOffset](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollX)
* [Window.prototype.scrollY / Window.prototype.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollY)

## How big does the script end up being?

| Browser               | Filesize |
| --------------------- | --------:|
| Chrome                |    385 B |
| Internet Explorer 10+ |    396 B |
| Firefox 4+            |    397 B |
| Safari 6+             |    400 B |
| Safari (iOS 6)        |    400 B |
| Safari 5.1            |    536 B |
| Firefox 3.6           |    864 B |
| Opera 15+             |    899 B |
| Internet Explorer 9   |  1.43 KB |
| Safari 4              |  1.82 KB |
| Internet Explorer 8   |  5.15 KB |
| Internet Explorer 6/7 |  6.93 KB |

Thanks for reading. Now, please&hellip; enjoy!
