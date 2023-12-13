
// Number.isInteger
Number.isInteger = Number.isInteger || function (value) {
	return typeof value === "number" &&
		isFinite(value) &&
		Math.floor(value) === value;
};
