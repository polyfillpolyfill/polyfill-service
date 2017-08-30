// Taken from https://github.com/w3c/IntersectionObserver/blob/b7d62353e9a1128dd66d0eeeb532278e2ae38488/polyfill/intersection-observer.js#L27
// Minimal polyfill for Edge 15's lack of `isIntersecting`
// See: https://github.com/WICG/IntersectionObserver/issues/211
if ('IntersectionObserverEntry' in window && !('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
	Object.defineProperty(window.IntersectionObserverEntry.prototype,
		'isIntersecting', {
			get: function () {
				return this.intersectionRatio > 0;
			}
		});
} else {
	/**
	 * Creates the global IntersectionObserverEntry constructor.
	 * https://wicg.github.io/IntersectionObserver/#intersection-observer-entry
	 * @param {Object} entry A dictionary of instance properties.
	 * @constructor
	 */
	function IntersectionObserverEntry(entry) {
		this.time = entry.time;
		this.target = entry.target;
		this.rootBounds = entry.rootBounds;
		this.boundingClientRect = entry.boundingClientRect;
		this.intersectionRect = entry.intersectionRect || {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			width: 0,
			height: 0
		};
		try {
			this.isIntersecting = !!entry.intersectionRect;
		} catch (err) {
			// This means we are using the IntersectionObserverEntry polyfill which has only defined a getter
		}

		// Calculates the intersection ratio.
		var targetRect = this.boundingClientRect;
		var targetArea = targetRect.width * targetRect.height;
		var intersectionRect = this.intersectionRect;
		var intersectionArea = intersectionRect.width * intersectionRect.height;

		// Sets intersection ratio.
		if (targetArea) {
			this.intersectionRatio = intersectionArea / targetArea;
		} else {
			// If area is zero and is intersecting, sets to 1, otherwise to 0
			this.intersectionRatio = this.isIntersecting ? 1 : 0;
		}
	}
	IntersectionObserverEntry.prototype.isIntersecting = false;
	window.IntersectionObserverEntry = IntersectionObserverEntry;
}