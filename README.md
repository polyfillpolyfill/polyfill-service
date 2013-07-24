# polyfill

**polyfill** makes web development less frustrating by polyfilling as much javascript functionality in the browser as it can.

This service can be used on HTTP and HTTPS connections.

```html
<script src="//polyfill.io"></script>
```

Whoa, where's the script file?

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

## Polyfills target

Android, Blackberry, Chrome, Opera, Opera Mini, Opera Mobile, Firefox, Internet Explorer, Safari, Safari IOS

## Polyfills include

### HTML5 Elements

`abbr` `article` `aside` `audio` `bdi` `canvas` `data` `datalist` `details` `figcaption` `figure` `footer` `header` `hgroup` `main` `mark` `meter` `nav` `output` `progress` `section` `subline` `summary` `time` `video`

### Array

`every` `filter` `forEach` `indexOf` `lastIndexOf` `map` `some`

### Element

`addEventListener` `classList` `dispatchEvent` `hidden` `matchesSelector` `placeholder` `removeEventListener`

### Object

`defineProperty` `defineProperties` `keys`

### String

`trim`

### Window

`CustomEvent` `getComputedStyle` `innerHeight` `innerWidth` `pageXOffset` `pageYOffset`
