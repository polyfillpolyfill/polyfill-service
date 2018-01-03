'Blob' in this && (function () {
	try {
		new Blob();
		return true;
	} catch (e) {
		return false;
	}
}())
