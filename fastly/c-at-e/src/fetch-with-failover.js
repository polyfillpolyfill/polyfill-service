const nativeFetch = globalThis.fetch;

const backends = ["v3_eu", "v3_us"];

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export default async function fetchWithFailover(resource, input) {
	const backend = backends[getRandomInt(1)];

	let backendResponse = await nativeFetch(resource, Object.assign({
		backend: backend,
	}, input));

	if (backendResponse.ok) {
		return backendResponse
	}

	return nativeFetch(resource, Object.assign({
		backend: backend === "v3_eu" ? "v3_us" : "v3_eu",
	}, input));
}
