import Layout from "@financial-times/o-layout";
Layout.init(document.body);

import HeaderServices from "@financial-times/o-header-services";
HeaderServices.init();

// const polyfillAliases = require("polyfill-library/polyfills/__dist/aliases.json");

import Tabs from "@financial-times/o-tabs";

Tabs.init(document.body, {
	disablefocus: false
});

import Tooltip from "@financial-times/o-tooltip";
const createTooltips = () => {
	const tooltipObjects = Tooltip.init(document.body);

	tooltipObjects.forEach(tooltip => {
		tooltip.tooltipEl.addEventListener("oTooltip.show", event => {
			tooltipObjects.forEach(tooltip => {
				if (tooltip.tooltipEl !== event.target) {
					tooltip.close();
				}
			});
		});
	});
};

createTooltips();

const copyToClipboard = string => {
	// Create a <textarea> element
	const element = document.createElement("textarea");
	// Set its value to the string that you want copied
	element.value = string;
	// Make it readonly to be tamper-proof
	element.setAttribute("readonly", "");
	element.style.position = "absolute";
	// Move outside the screen to make it invisible
	element.style.left = "-9999px";
	// Append the <textarea> element to the HTML document
	document.body.append(element);
	// Mark as false to know no selection existed before
	let selected = false;
	// Check if there is any content selected previously
	if (document.getSelection().rangeCount > 0) {
		// Store selection if found
		selected = document.getSelection().getRangeAt(0);
	}
	// Select the <textarea> content
	element.select();
	// Copy - only works as a result of a user action (e.g. click events)
	document.execCommand("copy");
	// Remove the <textarea> element
	element.remove();
	if (selected) {
		// If a selection existed before copying
		// Unselect everything on the HTML document
		document.getSelection().removeAllRanges();
		// Restore the original selection
		document.getSelection().addRange(selected);
	}
};

const createPolyfillBundleURL = options => {
	const parameters = {};

	const gated = options.gated ? true : false;
	const always = options.always ? true : false;

	if (gated && always) {
		parameters.flags = "gated,always";
	} else if (gated) {
		parameters.flags = "gated";
	} else if (always) {
		parameters.flags = "always";
	}

	if (options.version) {
		parameters.version = options.version;
	}

	if (options.callback) {
		parameters.callback = options.callback;
	}

	if (options.rum) {
		parameters.rum = options.rum;
	}

	if (options.features.length > 0) {
		parameters.features = options.features.join(",");
	}

	const minified = options.minified ? true : false;
	const extension = minified ? ".min.js" : ".js";

	return Object.keys(parameters).length > 0 ? `https://polyfill.io/v3/polyfill${extension}?${new URLSearchParams(parameters).toString()}` : `https://polyfill.io/v3/polyfill${extension}`;
};

const createPolyfillBundleHTML = options => {
	return `<script crossorigin="anonymous" src="${createPolyfillBundleURL(options)}"></script>`;
};

const updatePolyfillBundle = options => {
	const bundleURLNode = document.querySelector("#polyfill-bundle-url");
	const bundleHTMLNode = document.querySelector("#polyfill-bundle-html");
	bundleURLNode.textContent = createPolyfillBundleURL(options);
	bundleHTMLNode.textContent = createPolyfillBundleHTML(options);
};

const defaultPolyfillBundleOptions = {
	minified: true,
	gated: false,
	always: false,
	rum: 0,
	features: [],
	callback: "",
	version: ""
};

const polyfillBundleOptions = Object.assign({}, defaultPolyfillBundleOptions);

const renderFeatureList = ({ polyfillAliases, polyfills }) => {
	let html = "";
	for (const item of polyfillAliases) {
		html += `<div class="polyfill" data-feature-name="${item.name}-polyfill">
				<label>
					<input type="checkbox" name="${item.name}">
					<span class="o-forms-input__label">${item.name}</span>
				</label>
				<button class="tooltip-button o-buttons o-buttons--secondary o-buttons--mono o-buttons-icon o-buttons-icon--more o-buttons-icon--icon-only" id="${item.name}-tooltip-target">
					<span class="o-buttons-icon__label">More about ${item.name} (opens tooltip).</span>
				</button>

				<div id="${item.name}-tooltip-element" data-o-component="o-tooltip" data-o-tooltip-append-to-body data-o-tooltip-position="right" data-o-tooltip-target="${
			item.name
		}-tooltip-target" data-o-tooltip-toggle-on-click="true">
					<div class="o-tooltip-content">
						<ul>
						${item.polyfills.map(polyfill => `<li>${polyfill}</li>`).join('')}
						</ul>
					</div>
				</div>
			</div>`;
	}
	for (const item of polyfills) {
		html += `<div class="polyfill" data-feature-name="${item.name}-polyfill">
				<label>
					<input type="checkbox" name="${item.name}">
					<span class="o-forms-input__label">${item.name}</span>
				</label>
				<button class="tooltip-button o-buttons o-buttons--secondary o-buttons--mono o-buttons-icon o-buttons-icon--more o-buttons-icon--icon-only" id="${item.name}-tooltip-target">
					<span class="o-buttons-icon__label">More about ${item.name} (opens tooltip).</span>
				</button>

				<div id="${item.name}-tooltip-element" data-o-component="o-tooltip" data-o-tooltip-append-to-body data-o-tooltip-position="right" data-o-tooltip-target="${
			item.name
		}-tooltip-target" data-o-tooltip-toggle-on-click="true">
					<div class="o-tooltip-content">
						<ul>
							${item.aliasFor ? `<li class='alias'>Alias for <code>${item.aliasFor}</code></li>` : ""}
							${item.license ? `<li class='license'><a title='This polyfill has a specific licence' href='https://choosealicense.com/licenses/${item.licenseLowerCase}'>License: ${item.license}</a></li>` : ""}
							${item.spec ? `<li><a href='${item.spec}'>Specification</a></li>` : ""}
							${item.docs ? `<li><a href='${item.docs}'>Documentation</a></li>` : ""}
							${item.baseDir ? `<li><a href='https://github.com/Financial-Times/polyfill-library/tree/main/polyfills/${item.baseDir}'>Polyfill source</a></li>` : ""}
						</ul>
					</div>
				</div>
			</div>`;
	}
	return html;
};

const libraryVersionInput = document.querySelector("#library-version");
if (libraryVersionInput) {
	libraryVersionInput.addEventListener("change", async event => {
		const version = event.target.value;
		// if version is not selected, get the data for the latest version
		const response = await fetch(`/v3/json/library-${version || event.target.options[1].value}.json`);
		if (response.ok) {
			const data = await response.json();
			featuresList.innerHTML = renderFeatureList(data);
			[...featuresList.querySelectorAll("input")].forEach(node => {
				node.addEventListener("change", updateFeaturesListFromEvent);
			});
			polyfillBundleOptions.features = [];
			polyfillBundleOptions.version = version;
			updatePolyfillBundle(polyfillBundleOptions);
			createTooltips();

			// reset the polyfill name filter.
			document.querySelector("#filter").value = '';
		}
	});
}

function resetFeaturesList() {
	return [...document.querySelectorAll("#features-list [data-feature-name]")].forEach(function(element) {
		element.removeAttribute("aria-hidden");
	});
}

function filterFeatures(event) {
	let inputValue = event.target.value;

	if (event.type === "paste") {
		const clipboardData = event.clipboardData || window.clipboardData;
		inputValue = clipboardData.getData("Text");
	}

	if (inputValue === "") {
		resetFeaturesList();
	} else {
		const featuresByName = {}
		const featuresRows = [...document.querySelectorAll("#features-list [data-feature-name]")];

		featuresRows.forEach(node => {
			featuresByName[node.dataset.featureName] = node;
		});
		Object.entries(featuresByName).forEach(function([key, node]) {
			if (key.toLowerCase().includes(inputValue.toLowerCase())) {
				node.removeAttribute("aria-hidden");
			} else {
				node.setAttribute("aria-hidden", true);
			}
		});
	}
}

const filterInput = document.querySelector("#filter");
if (filterInput) {
	filterInput.addEventListener("keyup", filterFeatures);
	filterInput.addEventListener("paste", filterFeatures);
}

const callbackInput = document.querySelector("#callback");

if (callbackInput) {
	callbackInput.addEventListener("keyup", updateCallback);
	callbackInput.addEventListener("paste", updateCallback);
}
function updateCallback(event) {
	let inputValue = event.target.value;

	if (event.type === "paste") {
		const clipboardData = event.clipboardData || window.clipboardData;
		inputValue = clipboardData.getData("Text");
	}

	polyfillBundleOptions.callback = inputValue;
	updatePolyfillBundle(polyfillBundleOptions);
}

const minified1 = document.querySelector("#minified1");
if (minified1) {
	minified1.addEventListener("change", function minifiedCallback() {
		polyfillBundleOptions.minified = true;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const minified2 = document.querySelector("#minified2");
if (minified2) {
	minified2.addEventListener("change", function() {
		polyfillBundleOptions.minified = false;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const gated1 = document.querySelector("#gated1");
if (gated1) {
	gated1.addEventListener("change", function gatedCallback() {
		polyfillBundleOptions.gated = true;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const gated2 = document.querySelector("#gated2");
if (gated2) {
	gated2.addEventListener("change", function() {
		polyfillBundleOptions.gated = false;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const rum1 = document.querySelector("#rum1");
if (rum1) {
	rum1.addEventListener("change", function rumCallback() {
		polyfillBundleOptions.rum = true;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const rum2 = document.querySelector("#rum2");
if (rum2) {
	rum2.addEventListener("change", function() {
		polyfillBundleOptions.rum = false;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const always1 = document.querySelector("#always1");
if (always1) {
	always1.addEventListener("change", function alwaysCallback() {
		polyfillBundleOptions.always = true;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const always2 = document.querySelector("#always2");
if (always2) {
	always2.addEventListener("change", function() {
		polyfillBundleOptions.always = false;
		updatePolyfillBundle(polyfillBundleOptions);
	});
}

const addFeatureToList = (list, feature) => {
	if (!list.includes(feature)) {
		list.push(feature);
	}
};

const removeFeatureToList = (list, feature) => {
	const index = list.indexOf(feature);

	if (index !== -1) {
		list.splice(index, 1);
	}
};

const updateFeaturesListFromEvent = event => {
	if (event.target.checked) {
		addFeatureToList(polyfillBundleOptions.features, event.target.name);
	} else {
		removeFeatureToList(polyfillBundleOptions.features, event.target.name);
	}
	updatePolyfillBundle(polyfillBundleOptions);
};

const featuresList = document.querySelector("#features-list");
if (featuresList) {
	[...featuresList.querySelectorAll("input")].forEach(node => {
		node.addEventListener("change", updateFeaturesListFromEvent);
	});
}

const copyURLButton = document.querySelector("#copy-url");
if (copyURLButton) {
	let copyURLButtonTimeout;
	const copyURLButtonOriginalText = copyURLButton.textContent;
	copyURLButton.addEventListener("click", () => {
		copyToClipboard(createPolyfillBundleURL(polyfillBundleOptions));
		copyURLButton.textContent = "Copied to clipboard";
		clearTimeout(copyURLButtonTimeout);
		copyURLButtonTimeout = setTimeout(() => {
			copyURLButton.innerHTML = copyURLButtonOriginalText;
		}, 5000);
	});
}

const copyHTMLButton = document.querySelector("#copy-html");
if (copyHTMLButton) {
	let copyHTMLButtonTimeout;
	const copyHTMLButtonOriginalText = copyHTMLButton.textContent;
	copyHTMLButton.addEventListener("click", () => {
		copyToClipboard(createPolyfillBundleHTML(polyfillBundleOptions));
		copyHTMLButton.textContent = "Copied to clipboard";
		clearTimeout(copyHTMLButtonTimeout);
		copyHTMLButtonTimeout = setTimeout(() => {
			copyHTMLButton.innerHTML = copyHTMLButtonOriginalText;
		}, 5000);
	});
}
