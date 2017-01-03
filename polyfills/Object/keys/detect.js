'keys' in Object && (function () {
	// Safari 5.0 bug where Object.keys doesn't work with arguments
	return (Object.keys(arguments) || '').length === 2;
}(1, 2))
