'CustomEvent' in window &&

// In Safari, typeof CustomEvent == 'object' but it otherwise works fine
(typeof window.CustomEvent === 'function' ||
(window.CustomEvent.toString().indexOf('CustomEventConstructor')>-1))
