import axios from "axios";

const Base_URL = "http://localhost:4000";

export const instance = axios.create({
	baseURL: Base_URL,
});

export function createConfig(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

export async function signUp(user) {
	const response = await instance.post("/signUp", user);
	console.log(response);
	return response;
}

export async function login(user) {
	const response = await instance.post("/login", user);
	return response;
}

export async function logout(token) {
	const config = createConfig(token);
	const response = await instance.delete("/logout", config);
	return response;
}
