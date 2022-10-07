import { useState, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

import * as apiLocais from "../../service/apiLocais";

import Title from "../../components/title";
import Row from "../../components/row";
import { Form, Button } from "../../components/form";

import ResponsavelCrud from "../../components/responsaveisCrud";

import Table from "../../components/table";
import { BiPencil } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import cep from "cep-promise";

export default function EditeResponsaveis({ originalLocal, handlePage }) {
	const [responsaveis, setResponsaveis] = useState(null);
	const [principal, setPrincipal] = useState(null);
	const [creating, setCreating] = useState(false);
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const [newResponsavel, setNewResponsavel] = useState({
		nome: "",
		cep: "",
		telefone: "",
		cidade: "",
		estado: "",
		rua: "",
		bairro: "",
		localId: originalLocal.id,
	});

	useEffect(() => {
		async function getAddres() {
			try {
				const response = await apiLocais.getResponsaveis(originalLocal.id, token);

				const responsaveisWithAddres = await Promise.all(
					response.data.map(async (l) => {
						const address = await cep(l.cep);
						return { ...l, ...address };
					})
				);
				const princ = response.data.find((r) => r.principal === true);
				setPrincipal(princ);
				setResponsaveis(responsaveisWithAddres);

				return;
			} catch (err) {
				console.log(err);
			}
		}

		getAddres();
	}, [originalLocal, setMessage, token, creating]);

	async function handlerSubmit(e) {
		e.preventDefault();

		if (creating) {
			const body = {
				responsavel: {
					nome: newResponsavel.nome,
					cep: newResponsavel.cep,
					telefone: newResponsavel.telefone,
				},
				localId: newResponsavel.localId,
			};
			await apiLocais.createResponsaveis(body, token);

			setCreating(false);
			return;
		}
	}

	return (
		principal !== null && (
			<>
				<Title>
					{creating ? "Crie o novo responsavel" : "Responsavel Principal Original"}
				</Title>
				<Form
					width={"100%"}
					inputHeight={"32px"}
					onSubmit={(e) => {
						handlerSubmit(e);
					}}
				>
					{creating ? (
						<ResponsavelCrud obj={newResponsavel} setObj={setNewResponsavel} />
					) : (
						<ResponsavelCrud obj={principal} setObj={setPrincipal} />
					)}

					<Row>
						<Title marginBottom={"none"}>Responsaveis</Title>
						<IoIosAddCircleOutline
							size={25}
							onClick={() => setCreating(true)}
							cursor="pointer"
							color="#31cc93"
						/>
					</Row>
					{responsaveis && (
						<Table>
							<thead>
								<tr>
									<th>Nome</th>
									<th>CEP</th>
									<th>Responsavel</th>
								</tr>
							</thead>
							<tbody>
								{responsaveis.map((r) => (
									<tr key={r.id}>
										<td>{r.nome}</td>
										<td>{r.cep}</td>
										<td style={{ position: "relative" }}>
											{r.telefone}
											<BiPencil
												color="white"
												style={{ position: "absolute", right: "2px" }}
												onClick={() => {
													setCreating(true);
												}}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
					<Row turn>
						<Button
							type="text"
							onClick={() => {
								if (creating) setCreating(false);
								else handlePage("editeLocal");
							}}
						>
							{creating ? "Cancelar" : "Concluido"}
						</Button>
						<Button type="submit">
							{creating ? "Crie o novo responsavel" : "Editar"}
						</Button>
					</Row>
				</Form>
			</>
		)
	);
}
