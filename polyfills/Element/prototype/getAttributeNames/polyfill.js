Element.prototype.getAttributeNames = function() {
    return Array.from(this.attributes).map(function(a) {
        return a.name;
    });
};
