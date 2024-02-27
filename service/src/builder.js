/* eslint-env browser */
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

	return Object.keys(parameters).length > 0 ? `${location.protocol}//${location.host}/polyfill/v3/polyfill${extension}?${new URLSearchParams(parameters).toString()}` : `${location.protocol}//${location.host}/polyfill/v3/polyfill${extension}`;
};

const updatePolyfillBundle = options => {
	const bundleURLNode = document.querySelector("#polyfill-bundle-url");
	bundleURLNode.textContent = createPolyfillBundleURL(options);
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
	for (const [alias, polyfills] of Object.entries(polyfillAliases)) {
		html += `<div class="feature">
            <label for="${alias}">
                <input type="checkbox" id="${alias}" name="${alias}">
                ${alias}
            </label>
            <details class="alias">
                <summary>Included Polyfills</summary>
                <ul>
                    ${polyfills.map(polyfill => `<li>${polyfill}</li>`).join('')}
                </ul>
            </details>
        </div>`;
	}
	for (const polyfill of polyfills) {
		html += `<div class="feature">
            <label for="${polyfill}">
                <input type="checkbox" id="${polyfill}" name="${polyfill}">
                ${polyfill}
            </label>
        </div>`;
	}
	return html;
};

const libraryVersionInput = document.querySelector("#library-version");
if (libraryVersionInput) {
	libraryVersionInput.addEventListener("change", async event => {
		const version = event.target.value;
		// if version is not selected, get the data for the latest version
		const response = await fetch(`/polyfill/v3/json/library-${version || event.target.options[1].value}.json`);
		if (response.ok) {
			const data = await response.json();
			featuresList.innerHTML = renderFeatureList(data);
			[...featuresList.querySelectorAll("input")].forEach(node => {
				node.addEventListener("change", updateFeaturesListFromEvent);
			});
			polyfillBundleOptions.features = [];
			polyfillBundleOptions.version = version;
			updatePolyfillBundle(polyfillBundleOptions);

			// reset the polyfill name filter.
			document.querySelector("#filter-polyfills").value = '';
		}
	});
}

function featureNodes() {
	return [...document.querySelectorAll("#features-list .feature")]
}

function resetFeaturesList() {
	return featureNodes().forEach(function(node) {
		node.style.display="";
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
		const featuresRows = featureNodes();

		featuresRows.forEach(node => {
			featuresByName[node.children[0].getAttribute('for')] = node;
		});
		Object.entries(featuresByName).forEach(function([key, node]) {
			if (key.toLowerCase().includes(inputValue.toLowerCase())) {
				node.style.display="";
			} else {
				node.style.display="none";
			}
		});
	}
}

const filterInput = document.querySelector("#filter-polyfills");
filterInput?.addEventListener("keyup", filterFeatures);
filterInput?.addEventListener("paste", filterFeatures);

const callbackInput = document.querySelector("#callback");
callbackInput?.addEventListener("keyup", updateCallback);
callbackInput?.addEventListener("paste", updateCallback);

function updateCallback(event) {
	let inputValue = event.target.value;

	if (event.type === "paste") {
		const clipboardData = event.clipboardData || window.clipboardData;
		inputValue = clipboardData.getData("Text");
	}

	polyfillBundleOptions.callback = inputValue;
	updatePolyfillBundle(polyfillBundleOptions);
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
