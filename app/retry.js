export async function retry(function_) {
	try {
		return await function_();
	} catch {
		return await function_();
	}
}
