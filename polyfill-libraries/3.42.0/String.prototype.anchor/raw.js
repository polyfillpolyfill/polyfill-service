
// String.prototype.anchor
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.2String.prototype.anchor ( name )
// When the anchor method is called with argument name, the following steps are taken:
CreateMethodProperty(String.prototype, 'anchor', function anchor (name) {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "a", "name", name).
    return CreateHTML(S, "a", "name", name);
});