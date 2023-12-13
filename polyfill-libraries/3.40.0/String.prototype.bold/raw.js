
// String.prototype.bold
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.5String.prototype.bold ( )
// When the bold method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'bold', function bold() {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "b", "", "").
    return CreateHTML(S, "b", "", "");
});