import { instance, createConfig } from ".";

export async function create(local, token) {
	const config = createConfig(token);
	const response = await instance.post("/locais", local, config);
	return response;
}

export async function get(token) {
	const config = createConfig(token);
	const response = await instance.get("/locais", config);
	return response;
}
