/* global _addDOMTokenListProperty */
_addDOMTokenListProperty(window.Element, "classList", "class");
// Internet Explorer's HTMLElement does not inherit from Element, we need to patch classList on HTMLElement as well
_addDOMTokenListProperty(window.HTMLElement, "classList", "class");
