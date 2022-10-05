import Container from "../../components/center";

import { useState, useEffect } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Section from "../../components/section";
import { useNavigate } from "react-router-dom";
import CreateLocais from "./createTicket";
import ShowTickets from "./showTickets";

import { useAuth } from "../../contexts/AuthContext";

export default function TicketsPage() {
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
						<CreateLocais creating={setCreating} />
					) : (
						<ShowTickets creating={setCreating} />
					)}
				</Section>
			</Box>
		</Container>
	);
}
