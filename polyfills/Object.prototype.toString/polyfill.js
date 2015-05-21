var Object_prototype_toString = Object.prototype.toString
Object.prototype.toString = function() {
    if (this === null) return "[object Null]";
    if (this === undefined) return "[object Undefined]";
    return Object_prototype_toString.call(this);
}
