import { Form, Button } from "../../components/form";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "../../components/title";
import Row from "../../components/row";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

import * as apiTickets from "../../service/apiTickets";
import * as apiLocais from "../../service/apiLocais";
import * as apiUsers from "../../service/apiLogin";

import { useState, useEffect } from "react";
import AutoCompleteInput from "../../components/autoCompleteInput";

export default function CreateTicket({ creating }) {
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const [locais, setLocais] = useState([]);
	const [users, setUsers] = useState([]);

	const [ticket, setTicket] = useState({
		usuarioId: "",
		status: "PENDENTE",
		localId: "",
	});

	useEffect(() => {
		async function getLocaisAndUsers() {
			try {
				const response = await apiLocais.get(token);
				setLocais(response.data);
			} catch (err) {
				setMessage({ text: "Erro ao buscar locais" });
			}

			try {
				const response = await apiUsers.get(token);
				setUsers(response.data);
			} catch (err) {
				setMessage({ text: "Erro ao buscar usuarios" });
			}
		}

		getLocaisAndUsers();
	}, [token, setMessage]);

	async function save() {
		try {
			await apiTickets.create(ticket, token);
			creating(false);
			setMessage({ type: "success", text: "local cadastrado" });
		} catch (err) {
			setMessage({ text: "Erro ao salvar local" });
		}
		return;
	}

	return (
		<>
			<Title>Ticket</Title>
			<Form width={"100%"} inputHeight={"32px"}>
				<Grid container width={"100%"}>
					<Grid xs={6}>
						<AutoCompleteInput
							list={users}
							searchType="user"
							obj={ticket}
							setObj={setTicket}
						/>
					</Grid>
					<Grid xs={6}>
						<AutoCompleteInput
							list={locais}
							searchType="local"
							obj={ticket}
							setObj={setTicket}
							placeholder="Escolha o Local"
						/>
					</Grid>
				</Grid>
			</Form>
			<Row turn>
				<Button
					onClick={() => {
						window.location.replace("/tickets");
					}}
				>
					Cancelar
				</Button>
				<Button
					onClick={() => {
						console.log(ticket);
						save();
					}}
				>
					Criar
				</Button>
			</Row>
		</>
	);
}
