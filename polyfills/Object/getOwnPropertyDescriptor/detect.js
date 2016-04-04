'getOwnPropertyDescriptor' in Object && typeof Object.getOwnPropertyDescriptor === 'function' && (function doesGetOwnPropertyDescriptorWork(object) {
    try {
        object.sentinel = 0;
        return Object.getOwnPropertyDescriptor(
            object,
            "sentinel"
        ).value === 0;
    } catch (exception) {
        // returns falsy
    }
}())