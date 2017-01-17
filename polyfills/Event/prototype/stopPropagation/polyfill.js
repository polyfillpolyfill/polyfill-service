if (!Event.prototype.stopPropagation) {
  Event.prototype.stopPropagation = function() {
    this.cancelBubble = true;
  };
}