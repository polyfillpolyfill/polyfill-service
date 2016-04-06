'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function' && (function() {
    try {
    	var object = {};
        object.test = 0;
        return Object.getOwnPropertyDescriptor(
            object,
            "test"
        ).value === 0;
    } catch (exception) {
        return false
    }
}())
