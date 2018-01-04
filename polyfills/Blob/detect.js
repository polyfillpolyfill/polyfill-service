'Blob' in this && (function () {
	try {
		new Blob();
		return true;
	} catch (e) {
		return false;
	}
}()) && (function () {
	try {
		Blob();
		return false;
	} catch (e) {
		return true;
	}
}())
