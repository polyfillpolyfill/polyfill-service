
// String.prototype.fixed
/* globals CreateHTML, CreateMethodProperty */
// B.2.3.6String.prototype.fixed ( )
// When the fixed method is called with no arguments, the following steps are taken:
CreateMethodProperty(String.prototype, 'fixed', function fixed() {
    // 1. Let S be the this value.
    var S = this;
    // 2. Return ? CreateHTML(S, "tt", "", "").
    return CreateHTML(S, "tt", "", "");
});