import Row from "../../components/row";
import Title from "../../components/title";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as apiTickets from "../../service/apiTickets";
import TicketsSection, { Ticket } from "../../components/ticketsLayout";

export default function ShowTickets({ creating }) {
	const [tickets, settickets] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		async function getEmpresa() {
			try {
				const tickets = await apiTickets.get(token);
				settickets(tickets.data);
			} catch (err) {
				console.log(err);
			}
		}

		getEmpresa();
	}, [token]);

	console.log(tickets);

	return (
		<>
			<Row>
				<Title>Tickets</Title>
				<IoIosAddCircleOutline
					size={25}
					onClick={() => creating(true)}
					cursor="pointer"
				/>
			</Row>

			{tickets ? (
				tickets.length > 0 ? (
					<TicketsSection>
						{tickets.map((t) => (
							<Ticket key={t.id}>
								<p>{t.titulo}</p>
								<span>Local: {t.local}</span>
								<span>Usuario: {t.usuarioNome}</span>
								<span>Criador: {t.criador}</span>
								<span>Empresa Responsavel: {t.empresaResponsavel}</span>
								<span>Status: {t.status}</span>
							</Ticket>
						))}
					</TicketsSection>
				) : (
					"Começe a cadastra tickets"
				)
			) : (
				"carregando"
			)}
		</>
	);
}
