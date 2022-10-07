import { useState, useEffect } from "react";
import Title from "../../components/title";
import { Form, Button } from "../../components/form";
import cep from "cep-promise";

import Grid from "@mui/material/Unstable_Grid2";
import Row from "../../components/row";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

import * as apiEmpresas from "../../service/apiEmpresas";
import * as apiLocais from "../../service/apiLocais";

import AutoCompleteInput from "../../components/autoCompleteInput";
import handlerInput from "../../utils/handlerInput";
import completeAddressByCep from "../../utils/completeAddressByCep";

export default function EditeLocal({ originalLocal, handlePage }) {
	const [local, setLocal] = useState(null);
	const [empresas, setEmpresas] = useState([]);
	const [lastCep, setLastCep] = useState();
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const [editing, setEditing] = useState(false);
	const [editedLocal, setEditedLocal] = useState({
		nome: "",
		cep: "",
		cidade: "",
		estado: "",
		rua: "",
		bairro: "",
	});

	useEffect(() => {
		async function getAddres() {
			try {
				if (originalLocal.cep !== undefined) {
					const addressLocal = await cep(originalLocal.cep);
					setLocal({
						...originalLocal,
						cidade: addressLocal.city,
						estado: addressLocal.state,
						rua: addressLocal.street,
						bairro: addressLocal.neighborhood,
					});
				}
				return;
			} catch (err) {
				console.log(err);
			}
		}

		async function getEmpresas() {
			try {
				const response = await apiEmpresas.get(token);
				setEmpresas(response.data);
			} catch (err) {
				setMessage({ text: "Erro ao salvar empresa" });
			}
		}

		getAddres();
		getEmpresas();

		if (editedLocal.cep.length === 8) {
			completeAddressByCep(
				editedLocal,
				setEditedLocal,
				lastCep,
				setLastCep,
				setMessage
			);
		}
	}, [
		originalLocal,
		setMessage,
		token,
		editedLocal,
		setEditedLocal,
		lastCep,
		setLastCep,
	]);

	async function handlerSubmit(e) {
		e.preventDefault();

		if (editing) {
			const body = {
				nome: editedLocal.nome,
				cep: editedLocal.cep,
				empresaId: editedLocal.empresaId,
			};

			try {
				await apiLocais.update(body, originalLocal.id, token);
				setEditing(false);
				setMessage({ type: "success", text: "Local atualizado com sucesso" });
				handlePage("show");
			} catch (err) {
				console.log(err);
			}
			console.log(editedLocal);
			setEditing(false);
		}

		setEditing(true);

		return;
	}

	return (
		local && (
			<>
				<Title>Dados Originais</Title>
				<Form
					width={"100%"}
					inputHeight={"32px"}
					onSubmit={(e) => {
						handlerSubmit(e);
					}}
				>
					<Grid container spacing={2}>
						<Grid xs={6}>
							<label>Local Nome</label>
							<input
								required
								placeholder="Nome"
								type="text"
								name="nome"
								value={editing ? editedLocal.nome : local.nome}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								disabled={!editing}
							/>
						</Grid>
						<Grid xs={6}>
							<label>Empresa Responsavel</label>
							{editing ? (
								<AutoCompleteInput
									list={empresas}
									searchType="empresas"
									obj={editedLocal}
									setObj={setEditedLocal}
								/>
							) : (
								<input
									required
									placeholder="Empresa"
									name="estado"
									value={local.empresaNome}
									disabled={true}
								/>
							)}
						</Grid>
						<Grid xs={4}>
							<label>Estado</label>
							<input
								required
								placeholder="Estado"
								name="estado"
								value={editing ? editedLocal.estado : local.estado}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								disabled={!editing}
							/>
						</Grid>
						<Grid xs={5}>
							<label>Cidade</label>
							<input
								required
								placeholder="Cidade"
								name="cidade"
								value={editing ? editedLocal.cidade : local.cidade}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								disabled={!editing}
							/>
						</Grid>
						<Grid xs={3}>
							<label>Cep</label>
							<input
								required
								placeholder="CEP"
								type="text"
								name="cep"
								value={editing ? editedLocal.cep : local.cep}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								minLength={8}
								maxLength={8}
								disabled={!editing}
							/>
						</Grid>
						<Grid xs={5}>
							<label>Rua</label>
							<input
								required
								placeholder="Rua"
								name="rua"
								value={editing ? editedLocal.rua : local.rua}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								disabled={!editing}
							/>
						</Grid>
						<Grid xs={7}>
							<label>Bairro</label>
							<input
								required
								placeholder="Bairro"
								name="bairro"
								value={editing ? editedLocal.bairro : local.bairro}
								onChange={(e) =>
									editing
										? handlerInput(e, editedLocal, setEditedLocal)
										: handlerInput(e, local, setLocal)
								}
								disabled={!editing}
							/>
						</Grid>
					</Grid>
					<Row turn>
						<Button type="submit">{editing ? "Concluido" : "Editar Local"}</Button>
						<Button type="text" onClick={() => handlePage("editeResponsaveis")}>
							Editar Responsavel
						</Button>
					</Row>
				</Form>
			</>
		)
	);
}
