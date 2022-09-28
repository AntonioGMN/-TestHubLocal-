import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import AlertProvide from "./contexts/AlertContext";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
	return (
		<AlertProvide>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signUp" element={<SignUpPage />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</AlertProvide>
	);
}
