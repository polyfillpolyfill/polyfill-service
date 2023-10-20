
// String.prototype.fontcolor
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.7String.prototype.fontcolor ( color )
// When the fontcolor method is called with argument color, the following steps are taken:
CreateMethodProperty(String.prototype, 'fontcolor', function fontcolor(color) {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "font", "color", color).
    return CreateHTML(S, "font", "color", color);
});