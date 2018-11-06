/* global _addDOMTokenListProperty */
// Polyfill.io. Internet Explorer's SVGElement does not properly inherit from Element.
_addDOMTokenListProperty(window.SVGElement, "classList", "class");
