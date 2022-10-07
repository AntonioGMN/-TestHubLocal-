import Row from "../../components/row";
import Title from "../../components/title";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as apiTickets from "../../service/apiTickets";
import TicketsSection, { Ticket } from "../../components/ticketsLayout";
import cep from "cep-promise";
import { useAlert } from "../../contexts/AlertContext";

export default function ShowTickets({ creating }) {
	const [tickets, setTickets] = useState([]);
	const { setMessage } = useAlert();
	const { token } = useAuth();

	useEffect(() => {
		async function getEmpresa() {
			try {
				const response = await apiTickets.get(token);
				const tickets = response.data;
				const ticketsWithAddres = await Promise.all(
					tickets.map(async (t) => {
						const address = await cep(t.cep);
						return { ...t, ...address };
					})
				);

				setTickets(ticketsWithAddres);
			} catch (err) {
				console.log(err);
				setMessage({ text: "Erro a buscar tickets" });
			}
		}

		getEmpresa();
	}, [token, setTickets, setMessage]);

	console.log(tickets);

	return (
		<>
			<Row>
				<Title>Tickets</Title>
				<IoIosAddCircleOutline
					size={25}
					onClick={() => creating(true)}
					cursor="pointer"
					color="#31cc93"
				/>
			</Row>

			{tickets ? (
				tickets.length > 0 ? (
					<TicketsSection>
						{tickets.map((t) => {
							return (
								<Ticket key={t.id}>
									<p>{t.titulo}</p>
									<span>Nome do local: {t.local}</span>
									<span>
										Endereço: {`${t.street}, ${t.neighborhood} ${t.city}/${t.state} `}
									</span>
									<span>Usuario: {t.usuarioNome}</span>
									<span>Criador: {t.criador}</span>
									<span>Empresa Responsavel: {t.empresaResponsavel}</span>
									<span>Status: {t.status}</span>
								</Ticket>
							);
						})}
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
