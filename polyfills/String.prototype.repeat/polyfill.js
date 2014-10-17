String.prototype.repeat = function (count) {
	return new Array((count || 0) + 1).join(this);
};
