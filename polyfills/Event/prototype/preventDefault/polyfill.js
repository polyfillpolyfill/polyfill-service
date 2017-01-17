if (!Event.prototype.preventDefault) {
  Event.prototype.preventDefault = function() {
    this.returnValue = false;
  };
}