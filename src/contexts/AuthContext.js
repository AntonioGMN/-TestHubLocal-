import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const persistedToken = JSON.parse(localStorage.getItem("token"));
	const [token, setToken] = useState(persistedToken);

	function persistLogin(novoToken) {
		setToken(novoToken);
		localStorage.setItem("token", JSON.stringify(novoToken));
	}

	async function logout() {
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
