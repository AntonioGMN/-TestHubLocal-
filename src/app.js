import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpresasPage from "./pages/EmpresasPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LocaisPage from "./pages/LocaisPage";
import TicketsPage from "./pages/TicketsPage ";

import AlertProvide from "./contexts/AlertContext";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
	return (
		<AlertProvide>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<EmpresasPage />} />
						<Route path="/locais" element={<LocaisPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signUp" element={<SignUpPage />} />
						<Route path="/tickets" element={<TicketsPage />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</AlertProvide>
	);
}
