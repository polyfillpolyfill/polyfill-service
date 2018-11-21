Element.prototype.getAttributeNames = function getAttributeNames() {
    return Array.prototype.map.call(this.attributes, function(a) {
        return a.name;
    });
};
