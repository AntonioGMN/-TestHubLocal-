import { instance, createConfig } from "./apiService";

export async function shortlyUrl(url, token) {
	const config = createConfig(token);
	const response = await instance.post("/shortly", url, config);
	return response;
}

export async function getAll(token) {
	const config = createConfig(token);
	const response = await instance.get("/", config);
	return response;
}
