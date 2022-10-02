import Container from "../../components/center";

import { useState, useEffect } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Section from "../../components/section";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import ShowLocais from "./showLocais";
import CreateEmpresas from "./createLocal";

export default function LocaisPage() {
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
						<CreateEmpresas creating={setCreating} />
					) : (
						<ShowLocais creating={setCreating} />
					)}
				</Section>
			</Box>
		</Container>
	);
}
