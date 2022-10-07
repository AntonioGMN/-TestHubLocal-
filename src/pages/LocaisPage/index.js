import Container from "../../components/center";

import { useState, useEffect } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Section from "../../components/section";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import ShowLocais from "./showLocais";
import CreateEmpresas from "./createLocal";
import EditeLocal from "./editeLocal";
import EditeResponsaveis from "./editeResponsavel";

export default function LocaisPage() {
	const [page, setPage] = useState("show");
	const [localEdited, setLocalEdited] = useState(null);
	const { token } = useAuth();

	const navegate = useNavigate();

	useEffect(() => {
		if (!token) navegate("/login");
	}, [token, navegate]);

	function SelectedPage() {
		if (page === "creating") return <CreateEmpresas handlePage={setPage} />;
		if (page === "show")
			return <ShowLocais handlePage={setPage} setLocalEdited={setLocalEdited} />;
		if (page === "editeLocal")
			return <EditeLocal handlePage={setPage} originalLocal={localEdited} />;
		if (page === "editeResponsaveis")
			return (
				<EditeResponsaveis handlePage={setPage} originalLocal={localEdited} />
			);
	}

	return (
		<Container>
			<Box>
				<Nav />
				<Section>
					<SelectedPage />
				</Section>
			</Box>
		</Container>
	);
}
