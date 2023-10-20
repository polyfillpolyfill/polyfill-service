
// Number.isFinite
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
};
