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

export async function getResponsaveis(localId, token) {
	const config = createConfig(token);
	const response = await instance.get(`/locais/responsaveis/${localId}`, config);
	return response;
}

export async function createResponsaveis(local, token) {
	const config = createConfig(token);
	const response = await instance.post("/locais/responsavel", local, config);
	return response;
}

export async function update(local, localId, token) {
	const config = createConfig(token);
	const response = await instance.put(
		`/locais/update/${localId}`,
		local,
		config
	);
	return response;
}

export async function updateResponsaveis(responsavel, responsavelId, token) {
	const config = createConfig(token);
	const response = await instance.put(
		`/locais/responsaveis/update/${responsavelId}`,
		responsavel,
		config
	);
	return response;
}
