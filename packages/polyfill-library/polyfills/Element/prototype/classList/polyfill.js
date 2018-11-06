/* global _addDOMTokenListProperty */
_addDOMTokenListProperty(window.Element, "classList", "class");
// Internet Explorer's HTMLElement does not inherit from Element, we need to patch classList on HTMLElement as well.
// Safari 9 does not let you configure Element.prototype.classList, we need to patch HTMLElement instead.
_addDOMTokenListProperty(window.HTMLElement, "classList", "class");
