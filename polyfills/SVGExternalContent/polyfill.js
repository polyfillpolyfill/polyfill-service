/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */

function embed(svg, g) {
	if (g) {
		var viewBox = !svg.getAttribute('viewBox') && g.getAttribute('viewBox');
		var fragment = document.createDocumentFragment();
		var clone = g.cloneNode(true);

		if (viewBox) {
			svg.setAttribute('viewBox', viewBox);
		}

		while (clone.childNodes.length) {
			fragment.appendChild(clone.firstChild);
		}

		svg.appendChild(fragment);
	}
}

function loadreadystatechange(xhr) {
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var x = document.createElement('x');

			x.innerHTML = xhr.responseText;

			xhr.s.splice(0).map(function (array) {
				embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
			});
		}
	};

	xhr.onreadystatechange();
}

function svg4everybody(opts) {
	opts = opts || {};

	var uses = document.getElementsByTagName('use');
	var nosvg;

	if (LEGACY_SUPPORT) {
		var fallback = opts.fallback || function (src) {
			return src.replace(/\?[^#]+/, '').replace('#', '.').replace(/^\./, '') + '.png' + (/\?[^#]+/.exec(src) || [''])[0];
		};

		nosvg = 'nosvg' in opts ? opts.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent);

		if (nosvg) {
			document.createElement('svg');
			document.createElement('use');
		}
	}

	var polyfill = 'polyfill' in opts ? opts.polyfill : LEGACY_SUPPORT ? (
		nosvg || /\bEdge\/12\b|\bMSIE [1-8]\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537
	) : (
		/\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537
	);

	var validate = opts.validate;
	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
	var svgCache = {};

	function oninterval() {
		var use, svg, i = 0;
		while(i < uses.length) { // "uses" array maybe change length in the loop
			use = uses[i];
			svg = use.parentNode;

			if (svg && /svg/i.test(svg.nodeName)) {
				var src = use.getAttribute('xlink:href');

				if (LEGACY_SUPPORT && nosvg) {
					var img = new Image();
					var width = svg.getAttribute('width');
					var height = svg.getAttribute('height');

					img.src = fallback(src, svg, use);

					if (width) {
						img.setAttribute('width', width);
					}

					if (height) {
						img.setAttribute('height', height);
					}

					svg.replaceChild(img, use);
				} else if (polyfill) {
					if (!validate || validate(src, svg, use)) {
						var url = src.split('#');
						var url_root = url[0];
						var url_hash = url[1];

						svg.removeChild(use);

						if (url_root.length) {
							var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();

							if (!xhr.s) {
								xhr.s = [];

								xhr.open('GET', url_root);

								xhr.send();
							}

							xhr.s.push([svg, url_hash]);

							loadreadystatechange(xhr);
						} else {
							embed(svg, document.getElementById(url_hash));
						}
					}
				}
			} else {
				// increase it only if the previous value was not "valid"
				i += 1;
			}
		}

		requestAnimationFrame(oninterval, 17);
	}

	if (polyfill) {
		oninterval();
	}
}
