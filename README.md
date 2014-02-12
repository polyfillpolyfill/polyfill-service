# polyfill

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.

```html
<script src="//polyfill.io"></script>
```

That&rsquo;s it. The script file *is* the [domain](https://polyfill.io). No need to specify the **http** or **https**, because the service runs over both. Just place it in the head of your document.

```html
<link href="//polyfill.io/normalize.css" rel="stylesheet">
```

Don&rsquo;t punish Chrome for old Internet Explorer CSS deficiencies either, because [Normalize.css](https://github.com/necolas/normalize.css) has been ported over to deliver only the styles the browser needs.

## What can I do with this?

You can code right the first time. For example, use **querySelector** in IE6.

```js
var el = document.querySelector(".foo.bar");
```

Or **matches** without a vendor prefix.

```js
el.matches(".bar");
```

These polyfills are clean, compressed, and aggressively cached.

## What browsers are supported?

Android 2.2+, Blackberry 7+, Chrome, Opera 11.5+, Opera Mini 5+, Opera Mobile 10+, Firefox 3.6+, Internet Explorer 6+, Safari 4+, and Safari IOS 4+.

## What functionality is supported?

You should be able to use the following features to a reasonable extent in every supported browser.

### HTML Elements

[abbr](http://developers.whatwg.org/text-level-semantics.html#the-abbr-element),
[article](http://developers.whatwg.org/sections.html#the-article-element),
[aside](http://developers.whatwg.org/sections.html#the-aside-element),
[audio](http://developers.whatwg.org/the-video-element.html#the-audio-element),
[bdi](http://developers.whatwg.org/text-level-semantics.html#the-bdi-element),
[canvas](http://developers.whatwg.org/the-canvas-element.html#the-canvas-element),
[data](http://developers.whatwg.org/text-level-semantics.html#the-data-element),
[datalist](http://developers.whatwg.org/the-button-element.html#the-datalist-element),
[details](http://developers.whatwg.org/interactive-elements.html#the-details-element),
[figcaption](http://developers.whatwg.org/grouping-content.html#the-figcaption-element),
[figure](http://developers.whatwg.org/grouping-content.html#the-figure-element),
[footer](http://developers.whatwg.org/sections.html#the-footer-element),
[header](http://developers.whatwg.org/sections.html#the-header-element),
[hgroup](http://developers.whatwg.org/sections.html#the-hgroup-element),
[main](http://www.whatwg.org/specs/web-apps/current-work/multipage/grouping-content.html#the-main-element),
[mark](http://developers.whatwg.org/text-level-semantics.html#the-mark-element),
[meter](http://developers.whatwg.org/the-button-element.html#the-meter-element),
[nav](http://developers.whatwg.org/sections.html#the-nav-element),
[output](http://developers.whatwg.org/the-button-element.html#the-output-element),
[progress](http://developers.whatwg.org/the-button-element.html#the-progress-element),
[section](http://developers.whatwg.org/sections.html#the-section-element),
[subhead](http://rawgithub.com/w3c/subline/master/index.html),
[summary](http://developers.whatwg.org/interactive-elements.html#the-summary-element),
[time](http://developers.whatwg.org/text-level-semantics.html#the-time-element),
[video](http://developers.whatwg.org/the-video-element.html#the-video-element)

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
* [Element.prototype.getElementsByClassName](http://caniuse.com/getelementsbyclassname)

### Mutations

* [Element.prototype.prepend](http://dom.spec.whatwg.org/#dom-parentnode-prepend)
* [Element.prototype.append](http://dom.spec.whatwg.org/#dom-parentnode-append)
* [Element.prototype.before](http://dom.spec.whatwg.org/#dom-childnode-before)
* [Element.prototype.after](http://dom.spec.whatwg.org/#dom-childnode-after)
* [Element.prototype.remove](http://dom.spec.whatwg.org/#dom-childnode-remove)
* [Element.prototype.replace](http://dom.spec.whatwg.org/#dom-childnode-replace)

### Events

* [Element.prototype.addEventListener / Element.prototype.removeEventListener / Element.prototype.dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Browser_Compatibility)
* [new Event / new CustomEvent](https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Events/Creating_and_triggering_events)
* [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/DOMContentLoaded#Browser_compatibility)
* [hashchange](http://caniuse.com/hashchange)

### Window

* [Window.prototype.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/window.innerHeight)
* [Window.prototype.innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/window.innerWidth)
* [Window.prototype.scrollX / Window.prototype.pageXOffset](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollX)
* [Window.prototype.scrollY / Window.prototype.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/window.scrollY)

### Other Goodies

* [Window.prototype.JSON](http://caniuse.com/json)
* [Window.prototype.localStorage](http://caniuse.com/localStorage)
* [Window.prototype.getComputedStyle](http://caniuse.com/getComputedStyle)
* [Window.prototype.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/window.matchMedia)
* [Window.prototype.matchMedia.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Methods)
* [Window.prototype.matchMedia.addListener](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Methods)
* [Navigator.prototype.geolocation](http://caniuse.com/geolocation)
* [Element.prototype.classList](http://caniuse.com/classList)
* [Element.prototype.hasAttribute](https://developer.mozilla.org/en-US/docs/Web/API/element.hasAttribute)
* [Element.prototype.placeholder](http://caniuse.com/input-placeholder)

## How big does the script end up being?

With every polyfill loaded, filesizes are pleasingly small.

| Browser               | Filesize |
| --------------------- | --------:|
| Chrome                |    338 B |
| Internet Explorer 10+ |    346 B |
| Firefox 6+            |    346 B |
| Safari 6+             |    351 B |
| Safari 5.1            |    442 B |
| Opera 15+             |    798 B |
| Firefox 3.6           |  1.57 KB |
| Internet Explorer 9   |  1.71 KB |
| Safari 4              |  2.32 KB |
| Internet Explorer 8   |  4.88 KB |
| Internet Explorer 6/7 |  7.70 KB |

## How do I use this on my own?

First, install [GIT](http://git-scm.com/downloads) to [fork this repository](https://github.com/jonathantneal/polyfill/fork). Then, install [Node](http://nodejs.org) and [Grunt](http://gruntjs.com/getting-started#installing-the-cli) to [build this project](http://gruntjs.com/getting-started#working-with-an-existing-grunt-project).

## Can I hack this?

Yes. By default, almost any [polyfill.io](https://polyfill.io) URL returns minified JavaScript polyfills.

```html
<script src="//polyfill.io"></script>
```

```html
<script src="//polyfill.io/same-difference/whatever.js"></script>
```

*Both scripts return only critical JavaScript polyfills.*

Similarly, adding **.css** to the end of the URL returns minified CSS polyfills.

```html
<link href="//polyfill.io/.css" rel="stylesheet">
```

```html
<link href="//polyfill.io/same-difference/whatever.css" rel="stylesheet">
```

*Both links return only critical CSS polyfills.*

Adding **maybe(X)** to the URL will return only the specific JavaScript or CSS polyfills needed by the user agent, where **X** is a comma-delimited list of the desired scripts or elements.

```html
<script src="//polyfill.io/maybe(array,geolocation)"></script>
```

*Returns only critical JavaScript polyfills for array and geolocation.*

```html
<link href="//polyfill.io/maybe(article,section).css" rel="stylesheet">
```

*Returns only critical CSS polyfills for article and section.*

Adding **gimme(X)** to the URL will return only specific JavaScript or CSS polyfills (regardless of the user agent), where **X** is a comma-delimited list of the desired scripts or elements. This is your sniff-free solution.

```html
<script src="//polyfill.io/gimme(array)"></script>
```

*Returns all JavaScript polyfills for array.*

```html
<link href="//polyfill.io/gimme(section).css" rel="stylesheet">
```

*Returns all CSS polyfills for section.*

Adding **readable** to the URL will return human readable JavaScript or CSS.

```html
<script src="//polyfill.io/readable"></script>
```

```html
<link href="//polyfill.io/readable.css" rel="stylesheet">
```

## We&rsquo;re good.

Now, please&hellip; enjoy!
