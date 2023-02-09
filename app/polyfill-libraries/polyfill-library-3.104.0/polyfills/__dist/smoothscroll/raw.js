
// smoothscroll
(function (global, factory) {
    var exports = {};
    factory(exports);
    exports.polyfill();
}(this, (function (exports) { 'use strict';

    var ease = function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    };
    var DURATION = 500;
    var isScrollBehaviorSupported = function () { return "scrollBehavior" in document.documentElement.style; };
    var original = {
        _elementScroll: undefined,
        get elementScroll() {
            return (this._elementScroll || (this._elementScroll = HTMLElement.prototype.scroll ||
                HTMLElement.prototype.scrollTo ||
                function (x, y) {
                    this.scrollLeft = x;
                    this.scrollTop = y;
                }));
        },
        _elementScrollIntoView: undefined,
        get elementScrollIntoView() {
            return (this._elementScrollIntoView || (this._elementScrollIntoView = HTMLElement.prototype.scrollIntoView));
        },
        _windowScroll: undefined,
        get windowScroll() {
            return (this._windowScroll || (this._windowScroll = window.scroll || window.scrollTo));
        },
    };
    var modifyPrototypes = function (modification) {
        var prototypes = [HTMLElement.prototype, SVGElement.prototype, Element.prototype];
        prototypes.forEach(function (prototype) { return modification(prototype); });
    };
    var now = function () { var _a, _b, _c; return (_c = (_b = (_a = window.performance) === null || _a === void 0 ? void 0 : _a.now) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : Date.now(); };
    var step = function (context) {
        var currentTime = now();
        var elapsed = (currentTime - context.timeStamp) / (context.duration || DURATION);
        if (elapsed > 1) {
            context.method(context.targetX, context.targetY);
            context.callback();
            return;
        }
        var value = (context.timingFunc || ease)(elapsed);
        var currentX = context.startX + (context.targetX - context.startX) * value;
        var currentY = context.startY + (context.targetY - context.startY) * value;
        context.method(currentX, currentY);
        context.rafId = requestAnimationFrame(function () {
            step(context);
        });
    };
    // https://drafts.csswg.org/cssom-view/#normalize-non-finite-values
    var nonFinite = function (value) {
        if (!isFinite(value)) {
            return 0;
        }
        return Number(value);
    };
    var isObject = function (value) {
        var type = typeof value;
        return value !== null && (type === "object" || type === "function");
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    var elementScroll = function (element, options) {
        var _a, _b;
        var originalBoundFunc = original.elementScroll.bind(element);
        if (options.left === undefined && options.top === undefined) {
            return;
        }
        var startX = element.scrollLeft;
        var startY = element.scrollTop;
        var targetX = nonFinite((_a = options.left) !== null && _a !== void 0 ? _a : startX);
        var targetY = nonFinite((_b = options.top) !== null && _b !== void 0 ? _b : startY);
        if (options.behavior !== "smooth") {
            return originalBoundFunc(targetX, targetY);
        }
        var removeEventListener = function () {
            window.removeEventListener("wheel", cancelScroll);
            window.removeEventListener("touchmove", cancelScroll);
        };
        var context = {
            timeStamp: now(),
            duration: options.duration,
            startX: startX,
            startY: startY,
            targetX: targetX,
            targetY: targetY,
            rafId: 0,
            method: originalBoundFunc,
            timingFunc: options.timingFunc,
            callback: removeEventListener,
        };
        var cancelScroll = function () {
            cancelAnimationFrame(context.rafId);
            removeEventListener();
        };
        window.addEventListener("wheel", cancelScroll, {
            passive: true,
            once: true,
        });
        window.addEventListener("touchmove", cancelScroll, {
            passive: true,
            once: true,
        });
        step(context);
    };
    var elementScrollPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        var originalFunc = original.elementScroll;
        modifyPrototypes(function (prototype) {
            return (prototype.scroll = function scroll() {
                if (arguments.length === 1) {
                    var scrollOptions = arguments[0];
                    if (!isObject(scrollOptions)) {
                        throw new TypeError("Failed to execute 'scroll' on 'Element': parameter 1 ('options') is not an object.");
                    }
                    return elementScroll(this, __assign(__assign({}, scrollOptions), animationOptions));
                }
                return originalFunc.apply(this, arguments);
            });
        });
    };

    var elementScrollBy = function (element, options) {
        var left = nonFinite(options.left || 0) + element.scrollLeft;
        var top = nonFinite(options.top || 0) + element.scrollTop;
        return elementScroll(element, __assign(__assign({}, options), { left: left, top: top }));
    };
    var elementScrollByPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        modifyPrototypes(function (prototype) {
            return (prototype.scrollBy = function scrollBy() {
                if (arguments.length === 1) {
                    var scrollByOptions = arguments[0];
                    if (!isObject(scrollByOptions)) {
                        throw new TypeError("Failed to execute 'scrollBy' on 'Element': parameter 1 ('options') is not an object.");
                    }
                    return elementScrollBy(this, __assign(__assign({}, scrollByOptions), animationOptions));
                }
                var left = Number(arguments[0]);
                var top = Number(arguments[1]);
                return elementScrollBy(this, { left: left, top: top });
            });
        });
    };

    // https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/dom/element.cc?l=647-681&rcl=02a6466f4efa021e4e198f373eccda3cfc56142b
    var toPhysicalAlignment = function (options, axis, isHorizontalWritingMode, isFlippedBlocksMode) {
        var alignment = (axis === 0 /* HorizontalScroll */ && isHorizontalWritingMode) ||
            (axis === 1 /* VerticalScroll */ && !isHorizontalWritingMode)
            ? options.inline
            : options.block;
        if (alignment === "center") {
            return 1 /* AlignCenterAlways */;
        }
        if (alignment === "nearest") {
            return 0 /* AlignToEdgeIfNeeded */;
        }
        if (alignment === "start") {
            return axis === 0 /* HorizontalScroll */
                ? isFlippedBlocksMode
                    ? 5 /* AlignRightAlways */
                    : 4 /* AlignLeftAlways */
                : 2 /* AlignTopAlways */;
        }
        if (alignment === "end") {
            return axis === 0 /* HorizontalScroll */
                ? isFlippedBlocksMode
                    ? 4 /* AlignLeftAlways */
                    : 5 /* AlignRightAlways */
                : 3 /* AlignBottomAlways */;
        }
        // Default values
        if (isHorizontalWritingMode) {
            return axis === 0 /* HorizontalScroll */
                ? 0 /* AlignToEdgeIfNeeded */
                : 2 /* AlignTopAlways */;
        }
        return axis === 0 /* HorizontalScroll */
            ? 4 /* AlignLeftAlways */
            : 0 /* AlignToEdgeIfNeeded */;
    };
    // code from stipsan/compute-scroll-into-view
    // https://github.com/stipsan/compute-scroll-into-view/blob/5396c6b78af5d0bbce11a7c4e93cc3146546fcd3/src/index.ts
    /**
     * Find out which edge to align against when logical scroll position is "nearest"
     * Interesting fact: "nearest" works similarily to "if-needed", if the element is fully visible it will not scroll it
     *
     * Legends:
     * ┌────────┐ ┏ ━ ━ ━ ┓
     * │ target │   frame
     * └────────┘ ┗ ━ ━ ━ ┛
     */
    var alignNearest = function (scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
        /**
         * If element edge A and element edge B are both outside scrolling box edge A and scrolling box edge B
         *
         *          ┌──┐
         *        ┏━│━━│━┓
         *          │  │
         *        ┃ │  │ ┃        do nothing
         *          │  │
         *        ┗━│━━│━┛
         *          └──┘
         *
         *  If element edge C and element edge D are both outside scrolling box edge C and scrolling box edge D
         *
         *    ┏ ━ ━ ━ ━ ┓
         *   ┌───────────┐
         *   │┃         ┃│        do nothing
         *   └───────────┘
         *    ┗ ━ ━ ━ ━ ┛
         */
        if ((elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd) ||
            (elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd)) {
            return 0;
        }
        /**
         * If element edge A is outside scrolling box edge A and element height is less than scrolling box height
         *
         *          ┌──┐
         *        ┏━│━━│━┓         ┏━┌━━┐━┓
         *          └──┘             │  │
         *  from  ┃      ┃     to  ┃ └──┘ ┃
         *
         *        ┗━ ━━ ━┛         ┗━ ━━ ━┛
         *
         * If element edge B is outside scrolling box edge B and element height is greater than scrolling box height
         *
         *        ┏━ ━━ ━┓         ┏━┌━━┐━┓
         *                           │  │
         *  from  ┃ ┌──┐ ┃     to  ┃ │  │ ┃
         *          │  │             │  │
         *        ┗━│━━│━┛         ┗━│━━│━┛
         *          │  │             └──┘
         *          │  │
         *          └──┘
         *
         * If element edge C is outside scrolling box edge C and element width is less than scrolling box width
         *
         *       from                 to
         *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
         *  ┌───┐                 ┌───┐
         *  │ ┃ │       ┃         ┃   │     ┃
         *  └───┘                 └───┘
         *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
         *
         * If element edge D is outside scrolling box edge D and element width is greater than scrolling box width
         *
         *       from                 to
         *    ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
         *        ┌───────────┐   ┌───────────┐
         *    ┃   │     ┃     │   ┃         ┃ │
         *        └───────────┘   └───────────┘
         *    ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
         */
        if ((elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize) ||
            (elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize)) {
            return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
        }
        /**
         * If element edge B is outside scrolling box edge B and element height is less than scrolling box height
         *
         *        ┏━ ━━ ━┓         ┏━ ━━ ━┓
         *
         *  from  ┃      ┃     to  ┃ ┌──┐ ┃
         *          ┌──┐             │  │
         *        ┗━│━━│━┛         ┗━└━━┘━┛
         *          └──┘
         *
         * If element edge A is outside scrolling box edge A and element height is greater than scrolling box height
         *
         *          ┌──┐
         *          │  │
         *          │  │             ┌──┐
         *        ┏━│━━│━┓         ┏━│━━│━┓
         *          │  │             │  │
         *  from  ┃ └──┘ ┃     to  ┃ │  │ ┃
         *                           │  │
         *        ┗━ ━━ ━┛         ┗━└━━┘━┛
         *
         * If element edge C is outside scrolling box edge C and element width is greater than scrolling box width
         *
         *           from                 to
         *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
         *  ┌───────────┐           ┌───────────┐
         *  │     ┃     │   ┃       │ ┃         ┃
         *  └───────────┘           └───────────┘
         *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
         *
         * If element edge D is outside scrolling box edge D and element width is less than scrolling box width
         *
         *           from                 to
         *        ┏ ━ ━ ━ ━ ┓         ┏ ━ ━ ━ ━ ┓
         *                ┌───┐             ┌───┐
         *        ┃       │ ┃ │       ┃     │   ┃
         *                └───┘             └───┘
         *        ┗ ━ ━ ━ ━ ┛         ┗ ━ ━ ━ ━ ┛
         *
         */
        if ((elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize) ||
            (elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize)) {
            return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
        }
        return 0;
    };
    var canOverflow = function (overflow) {
        return overflow !== "visible" && overflow !== "clip";
    };
    var isScrollable = function (element) {
        if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
            var style = getComputedStyle(element);
            return canOverflow(style.overflowY) || canOverflow(style.overflowX);
        }
        return false;
    };
    var parentElement = function (element) {
        var parentNode = element.parentNode;
        return (parentNode &&
            (parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                ? parentNode.host
                : parentNode));
    };
    var elementScrollIntoView = function (element, options) {
        var e_1, _a;
        if (!element.ownerDocument.documentElement.contains(element)) {
            return;
        }
        // On Chrome and Firefox, document.scrollingElement will return the <html> element.
        // Safari, document.scrollingElement will return the <body> element.
        // On Edge, document.scrollingElement will return the <body> element.
        // IE11 does not support document.scrollingElement, but you can assume its <html>.
        // Used to handle the top most element that can be scrolled
        var scrollingElement = document.scrollingElement || document.documentElement;
        // Collect all the scrolling boxes, as defined in the spec: https://drafts.csswg.org/cssom-view/#scrolling-box
        var frames = [];
        for (var cursor = parentElement(element); cursor !== null; cursor = parentElement(cursor)) {
            // Stop when we reach the viewport
            if (cursor === scrollingElement) {
                frames.push(cursor);
                break;
            }
            // Skip document.body if it's not the scrollingElement and documentElement isn't independently scrollable
            if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
                continue;
            }
            // Now we check if the element is scrollable,
            // this code only runs if the loop haven't already hit the viewport or a custom boundary
            if (isScrollable(cursor)) {
                frames.push(cursor);
            }
        }
        // Support pinch-zooming properly, making sure elements scroll into the visual viewport
        // Browsers that don't support visualViewport
        // will report the layout viewport dimensions on document.documentElement.clientWidth/Height
        // and viewport dimensions on window.innerWidth/Height
        // https://www.quirksmode.org/mobile/viewports2.html
        // https://bokand.github.io/viewport/index.html
        var viewportWidth = window.visualViewport ? window.visualViewport.width : innerWidth;
        var viewportHeight = window.visualViewport ? window.visualViewport.height : innerHeight;
        // Newer browsers supports scroll[X|Y], page[X|Y]Offset is
        var viewportX = window.scrollX || window.pageXOffset;
        var viewportY = window.scrollY || window.pageYOffset;
        var _b = element.getBoundingClientRect(), targetHeight = _b.height, targetWidth = _b.width, targetTop = _b.top, targetRight = _b.right, targetBottom = _b.bottom, targetLeft = _b.left;
        var computedStyle = getComputedStyle(element);
        var writingMode = computedStyle.writingMode ||
            computedStyle.getPropertyValue("-webkit-writing-mode") ||
            computedStyle.getPropertyValue("-ms-writing-mode") ||
            "horizontal-tb";
        var isHorizontalWritingMode = ["horizontal-tb", "lr", "lr-tb", "rl"].some(function (mode) { return mode === writingMode; });
        var isFlippedBlocksWritingMode = ["vertical-rl", "tb-rl"].some(function (mode) { return mode === writingMode; });
        var alignX = toPhysicalAlignment(options, 0 /* HorizontalScroll */, isHorizontalWritingMode, isFlippedBlocksWritingMode);
        var alignY = toPhysicalAlignment(options, 1 /* VerticalScroll */, isHorizontalWritingMode, isFlippedBlocksWritingMode);
        var targetBlock = (function () {
            switch (alignY) {
                case 2 /* AlignTopAlways */:
                case 0 /* AlignToEdgeIfNeeded */:
                    return targetTop;
                case 3 /* AlignBottomAlways */:
                    return targetBottom;
                // case ScrollAlignment.AlignCenterAlways:
                default:
                    return targetTop + targetHeight / 2;
            }
        })();
        var targetInline = (function () {
            switch (alignX) {
                case 1 /* AlignCenterAlways */:
                    return targetLeft + targetWidth / 2;
                case 5 /* AlignRightAlways */:
                    return targetRight;
                // case ScrollAlignment.AlignLeftAlways:
                // case ScrollAlignment.AlignToEdgeIfNeeded:
                default:
                    return targetLeft;
            }
        })();
        var actions = [];
        var _loop_1 = function (frame) {
            var _a = frame.getBoundingClientRect(), height = _a.height, width = _a.width, top_1 = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left;
            var frameStyle = getComputedStyle(frame);
            var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
            var borderTop = parseInt(frameStyle.borderTopWidth, 10);
            var borderRight = parseInt(frameStyle.borderRightWidth, 10);
            var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
            var blockScroll = 0;
            var inlineScroll = 0;
            // The property existance checks for offfset[Width|Height] is because only HTMLElement objects have them,
            // but any Element might pass by here
            // @TODO find out if the "as HTMLElement" overrides can be dropped
            var scrollbarWidth = "offsetWidth" in frame
                ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight
                : 0;
            var scrollbarHeight = "offsetHeight" in frame
                ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom
                : 0;
            if (scrollingElement === frame) {
                // Handle viewport logic (document.documentElement or document.body)
                switch (alignY) {
                    case 2 /* AlignTopAlways */: {
                        blockScroll = targetBlock;
                        break;
                    }
                    case 3 /* AlignBottomAlways */: {
                        blockScroll = targetBlock - viewportHeight;
                        break;
                    }
                    case 1 /* AlignCenterAlways */: {
                        blockScroll = targetBlock - viewportHeight / 2;
                        break;
                    }
                    case 0 /* AlignToEdgeIfNeeded */: {
                        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
                        break;
                    }
                }
                switch (alignX) {
                    case 4 /* AlignLeftAlways */: {
                        inlineScroll = targetInline;
                        break;
                    }
                    case 5 /* AlignRightAlways */: {
                        inlineScroll = targetInline - viewportWidth;
                        break;
                    }
                    case 1 /* AlignCenterAlways */: {
                        inlineScroll = targetInline - viewportWidth / 2;
                        break;
                    }
                    case 0 /* AlignToEdgeIfNeeded */: {
                        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
                        break;
                    }
                }
                // Apply scroll position offsets and ensure they are within bounds
                blockScroll = Math.max(0, blockScroll + viewportY);
                inlineScroll = Math.max(0, inlineScroll + viewportX);
            }
            else {
                // Handle each scrolling frame that might exist between the target and the viewport
                switch (alignY) {
                    case 2 /* AlignTopAlways */: {
                        blockScroll = targetBlock - top_1 - borderTop;
                        break;
                    }
                    case 3 /* AlignBottomAlways */: {
                        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
                        break;
                    }
                    case 1 /* AlignCenterAlways */: {
                        blockScroll = targetBlock - (top_1 + height / 2) + scrollbarHeight / 2;
                        break;
                    }
                    case 0 /* AlignToEdgeIfNeeded */: {
                        blockScroll = alignNearest(top_1, bottom, height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
                        break;
                    }
                }
                switch (alignX) {
                    case 4 /* AlignLeftAlways */: {
                        inlineScroll = targetInline - left - borderLeft;
                        break;
                    }
                    case 5 /* AlignRightAlways */: {
                        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
                        break;
                    }
                    case 1 /* AlignCenterAlways */: {
                        inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2;
                        break;
                    }
                    case 0 /* AlignToEdgeIfNeeded */: {
                        inlineScroll = alignNearest(left, right, width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
                        break;
                    }
                }
                var scrollLeft = frame.scrollLeft, scrollTop = frame.scrollTop;
                // Ensure scroll coordinates are not out of bounds while applying scroll offsets
                blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - height + scrollbarHeight));
                inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - width + scrollbarWidth));
                // Cache the offset so that parent frames can scroll this into view correctly
                targetBlock += scrollTop - blockScroll;
                targetInline += scrollLeft - inlineScroll;
            }
            actions.push(function () { return elementScroll(frame, __assign(__assign({}, options), { top: blockScroll, left: inlineScroll })); });
        };
        try {
            for (var frames_1 = __values(frames), frames_1_1 = frames_1.next(); !frames_1_1.done; frames_1_1 = frames_1.next()) {
                var frame = frames_1_1.value;
                _loop_1(frame);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (frames_1_1 && !frames_1_1.done && (_a = frames_1.return)) _a.call(frames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        actions.forEach(function (run) { return run(); });
    };
    var elementScrollIntoViewPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        var originalFunc = original.elementScrollIntoView;
        modifyPrototypes(function (prototype) {
            return (prototype.scrollIntoView = function scrollIntoView() {
                var scrollIntoViewOptions = arguments[0];
                if (arguments.length === 1 && isObject(scrollIntoViewOptions)) {
                    return elementScrollIntoView(this, __assign(__assign({}, scrollIntoViewOptions), animationOptions));
                }
                return originalFunc.apply(this, arguments);
            });
        });
    };

    var elementScrollToPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        var originalFunc = original.elementScroll;
        modifyPrototypes(function (prototype) {
            return (prototype.scrollTo = function scrollTo() {
                if (arguments.length === 1) {
                    var scrollToOptions = arguments[0];
                    if (!isObject(scrollToOptions)) {
                        throw new TypeError("Failed to execute 'scrollTo' on 'Element': parameter 1 ('options') is not an object.");
                    }
                    var left = Number(scrollToOptions.left);
                    var top_1 = Number(scrollToOptions.top);
                    return elementScroll(this, __assign(__assign(__assign({}, scrollToOptions), { left: left, top: top_1 }), animationOptions));
                }
                return originalFunc.apply(this, arguments);
            });
        });
    };

    var windowScroll = function (options) {
        var _a, _b;
        var originalBoundFunc = original.windowScroll.bind(window);
        if (options.left === undefined && options.top === undefined) {
            return;
        }
        var startX = window.scrollX || window.pageXOffset;
        var startY = window.scrollY || window.pageYOffset;
        var targetX = nonFinite((_a = options.left) !== null && _a !== void 0 ? _a : startX);
        var targetY = nonFinite((_b = options.top) !== null && _b !== void 0 ? _b : startY);
        if (options.behavior !== "smooth") {
            return originalBoundFunc(targetX, targetY);
        }
        var removeEventListener = function () {
            window.removeEventListener("wheel", cancelScroll);
            window.removeEventListener("touchmove", cancelScroll);
        };
        var context = {
            timeStamp: now(),
            duration: options.duration,
            startX: startX,
            startY: startY,
            targetX: targetX,
            targetY: targetY,
            rafId: 0,
            method: originalBoundFunc,
            timingFunc: options.timingFunc,
            callback: removeEventListener,
        };
        var cancelScroll = function () {
            cancelAnimationFrame(context.rafId);
            removeEventListener();
        };
        window.addEventListener("wheel", cancelScroll, {
            passive: true,
            once: true,
        });
        window.addEventListener("touchmove", cancelScroll, {
            passive: true,
            once: true,
        });
        step(context);
    };
    var windowScrollPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        var originalFunc = original.windowScroll;
        window.scroll = function scroll() {
            if (arguments.length === 1) {
                var scrollOptions = arguments[0];
                if (!isObject(scrollOptions)) {
                    throw new TypeError("Failed to execute 'scroll' on 'Window': parameter 1 ('options') is not an object.");
                }
                return windowScroll(__assign(__assign({}, scrollOptions), animationOptions));
            }
            return originalFunc.apply(this, arguments);
        };
    };

    var windowScrollBy = function (options) {
        var left = nonFinite(options.left || 0) + (window.scrollX || window.pageXOffset);
        var top = nonFinite(options.top || 0) + (window.scrollY || window.pageYOffset);
        if (options.behavior !== "smooth") {
            return original.windowScroll.call(window, left, top);
        }
        return windowScroll(__assign(__assign({}, options), { left: left, top: top }));
    };
    var windowScrollByPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        window.scrollBy = function scrollBy() {
            if (arguments.length === 1) {
                var scrollByOptions = arguments[0];
                if (!isObject(scrollByOptions)) {
                    throw new TypeError("Failed to execute 'scrollBy' on 'Window': parameter 1 ('options') is not an object.");
                }
                return windowScrollBy(__assign(__assign({}, scrollByOptions), animationOptions));
            }
            var left = Number(arguments[0]);
            var top = Number(arguments[1]);
            return windowScrollBy({ left: left, top: top });
        };
    };

    var windowScrollToPolyfill = function (animationOptions) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        var originalFunc = original.windowScroll;
        window.scrollTo = function scrollTo() {
            if (arguments.length === 1) {
                var scrollToOptions = arguments[0];
                if (!isObject(scrollToOptions)) {
                    throw new TypeError("Failed to execute 'scrollTo' on 'Window': parameter 1 ('options') is not an object.");
                }
                var left = Number(scrollToOptions.left);
                var top_1 = Number(scrollToOptions.top);
                return windowScroll(__assign(__assign(__assign({}, scrollToOptions), { left: left, top: top_1 }), animationOptions));
            }
            return originalFunc.apply(this, arguments);
        };
    };

    var polyfill = function (options) {
        if (isScrollBehaviorSupported()) {
            return;
        }
        windowScrollPolyfill(options);
        windowScrollToPolyfill(options);
        windowScrollByPolyfill(options);
        elementScrollPolyfill(options);
        elementScrollToPolyfill(options);
        elementScrollByPolyfill(options);
        elementScrollIntoViewPolyfill(options);
    };

    exports.elementScroll = elementScroll;
    exports.elementScrollBy = elementScrollBy;
    exports.elementScrollByPolyfill = elementScrollByPolyfill;
    exports.elementScrollIntoView = elementScrollIntoView;
    exports.elementScrollIntoViewPolyfill = elementScrollIntoViewPolyfill;
    exports.elementScrollPolyfill = elementScrollPolyfill;
    exports.elementScrollTo = elementScroll;
    exports.elementScrollToPolyfill = elementScrollToPolyfill;
    exports.polyfill = polyfill;
    exports.seamless = polyfill;
    exports.windowScroll = windowScroll;
    exports.windowScrollBy = windowScrollBy;
    exports.windowScrollByPolyfill = windowScrollByPolyfill;
    exports.windowScrollPolyfill = windowScrollPolyfill;
    exports.windowScrollTo = windowScroll;
    exports.windowScrollToPolyfill = windowScrollToPolyfill;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

