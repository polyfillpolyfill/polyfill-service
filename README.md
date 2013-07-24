# polyfill

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. It can also be used as a service over HTTP and HTTPS connections.

```html
<script src="//polyfill.io"></script>
```

Whoa, where's the script file?

The script file *is* the domain.

## What does it do?

A lot. For instance, you can use querySelectors in IE6.

```js
var el = document.querySelector(".foo.bar");
```

Or use matchesSelector without a vendor prefix. 

```js
el.matchesSelector(".bar");
```

HTML5 elements are styling are covered too. The script is clean, compressed, and aggressively cached.

## What browsers are you supporting?

Android, Blackberry, Chrome, Opera (including 15+), Opera Mini, Opera Mobile, Firefox 3.6+, Internet Explorer 6+, Safari 4+, and Safari IOS.

## What functionality are you polyfilling?

You should be able to use all of the following features to a reasonable extent in every supported browser.

### HTML5 Elements

`abbr` `article` `aside` `audio` `bdi` `canvas` `data` `datalist` `details` `figcaption` `figure` `footer` `header` `hgroup` `main` `mark` `meter` `nav` `output` `progress` `section` `subline` `summary` `time` `video`

### Array

`is` `every` `filter` `forEach` `indexOf` `lastIndexOf` `map` `reduce` `reduceRight` `some`

### Object

`create` `defineProperty` `defineProperties` `getOwnPropertyNames` `getPrototypeOf` `is` `keys`

### String

`trim`

### Date

`Date.now` `toISOString`

### Event

`addEventListener` `removeEventListener` `dispatchEvent` `new Event` `new CustomEvent` `hashchange` `DOMContentLoaded` `geolocation`

### Selector
`querySelector` `querySelectorAll` `matchesSelector`

### Class
`getComputedStyle` `getElementsByClassName` `classList`

### Attribute
`hasAttribute` `hidden` `placeholder`

### Window
`innerHeight` `innerWidth` `pageXOffset` `pageYOffset`

Thanks for reading. Now, please&hellip; enjoy!