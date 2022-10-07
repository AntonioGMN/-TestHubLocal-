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
	const [editing, setEditing] = useState(false);
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const responsavelLimpo = {
		nome: "",
		cep: "",
		telefone: "",
		cidade: "",
		estado: "",
		rua: "",
		bairro: "",
		localId: originalLocal.id,
	};
	const [newResponsavel, setNewResponsavel] = useState(responsavelLimpo);

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
				const princ = responsaveisWithAddres.find((r) => r.principal === true);
				setPrincipal(princ);
				setResponsaveis(responsaveisWithAddres);

				return;
			} catch (err) {
				console.log(err);
			}
		}

		getAddres();
	}, [originalLocal, setMessage, token, creating, editing]);

	async function handlerSubmit(e) {
		e.preventDefault();

		if (creating) {
			await apiLocais.createResponsaveis(
				{
					responsavel: {
						nome: newResponsavel.nome,
						cep: newResponsavel.cep,
						telefone: newResponsavel.telefone,
					},
					localId: newResponsavel.localId,
				},
				token
			);

			setCreating(false);
			return;
		}

		if (editing) {
			console.log(newResponsavel);
			try {
				await apiLocais.updateResponsaveis(
					{
						responsavel: {
							nome: newResponsavel.nome,
							cep: newResponsavel.cep,
							telefone: newResponsavel.telefone,
						},
					},
					newResponsavel.id,
					token
				);
				setEditing(false);
				return;
			} catch (err) {
				console.log(err);
			}
		}
	}

	return (
		principal !== null && (
			<>
				<Title>
					{creating
						? "Crie o novo responsavel"
						: editing
						? "Edite Reponsavel"
						: "Responsavel Principal Original"}
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
					) : editing ? (
						<ResponsavelCrud obj={newResponsavel} setObj={setNewResponsavel} />
					) : (
						<ResponsavelCrud obj={principal} setObj={setPrincipal} desabled={true} />
					)}

					<Row>
						<Title marginBottom={"none"}>Responsaveis</Title>
						<IoIosAddCircleOutline
							size={25}
							onClick={() => {
								setNewResponsavel(responsavelLimpo);
								setCreating(true);
							}}
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
													setEditing(true);
													setNewResponsavel(r);
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
								if (editing) setEditing(false);
								if (!creating && !editing) handlePage("editeLocal");
							}}
						>
							{creating || editing ? "Cancelar" : "Concluido"}
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
