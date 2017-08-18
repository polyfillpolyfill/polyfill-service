/* Picturefill does not set the HTMLPictureElement global, and the srcset property of <source> does not appear to be accessible to JS in IE8, so in IE8 the only way to detect that the polyfill has applied is to use a non-standard global exposed by the polyfill */
'HTMLPictureElement' in this || 'picturefill' in this
