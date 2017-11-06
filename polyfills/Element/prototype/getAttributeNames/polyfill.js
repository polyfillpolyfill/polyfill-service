Element.prototype.getAttributeNames = function() {
    return Array.prototype.map.call(this.attributes, function(a) {
        return a.name;
    });
};
