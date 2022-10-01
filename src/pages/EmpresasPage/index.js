import Container from "../../components/center";

import { useState, useEffect } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Section from "../../components/section";
import { useNavigate } from "react-router-dom";
import AddEmpresas from "./createEmpresa";

import { useAuth } from "../../contexts/AuthContext";
import ShowEmpresas from "./showEmpresa";

export default function EmpresasPage() {
	const [creating, setCreating] = useState(false);
	const { token } = useAuth();

	const navegate = useNavigate();

	useEffect(() => {
		if (!token) navegate("/login");
	}, [token, navegate]);

	return (
		<Container>
			<Box>
				<Nav />
				<Section>
					{creating ? (
						<AddEmpresas creating={setCreating} />
					) : (
						<ShowEmpresas creating={setCreating} />
					)}
				</Section>
			</Box>
		</Container>
	);
}
