import { createContext, useContext } from "react";
import { useState } from "react";
import * as api from "../service/apiLogin";
import { useAlert } from "./AlertContext";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const persistedToken = JSON.parse(localStorage.getItem("token"));
	const [token, setToken] = useState(persistedToken);
	const { setMessage } = useAlert();

	async function persistLogin(novoToken) {
		setToken(novoToken);
		localStorage.setItem("token", JSON.stringify(novoToken));
	}

	async function logout(token) {
		try {
			await api.logout(token);
		} catch (err) {
			return setMessage({ text: err });
		}

		localStorage.clear();
		window.location.replace("/");
	}

	return (
		<AuthContext.Provider value={{ token, persistLogin, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
