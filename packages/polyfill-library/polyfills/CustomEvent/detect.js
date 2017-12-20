'CustomEvent' in this &&

// In Safari, typeof CustomEvent == 'object' but it otherwise works fine
(typeof this.CustomEvent === 'function' ||
(this.CustomEvent.toString().indexOf('CustomEventConstructor')>-1))
