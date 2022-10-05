import { instance, createConfig } from ".";

export async function create(ticket, token) {
	const config = createConfig(token);
	const response = await instance.post("/tickets", ticket, config);
	return response;
}

export async function get(token) {
	const config = createConfig(token);
	const response = await instance.get("/tickets", config);
	return response;
}
