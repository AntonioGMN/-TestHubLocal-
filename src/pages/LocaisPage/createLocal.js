import { Form, Button } from "../../components/form";
import Grid from "@mui/material/Unstable_Grid2";
import Title from "../../components/title";
import Row from "../../components/row";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

import ResponsavelCrud from "../../components/responsaveisCrud";
import * as apiEmpresas from "../../service/apiEmpresas";
import * as apiLocais from "../../service/apiLocais";

import { useState, useEffect } from "react";
import AutoCompleteInput from "../../components/autoCompleteInput";
import completeAddressByCep from "../../utils/completeAddressByCep";
import cep from "cep-promise";

export default function CreateLocais({ creating }) {
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const [empresas, setEmpresas] = useState([]);
	const [lastCep, setLastCep] = useState();
	const [local, setLocal] = useState({
		nome: "",
		cep: "",
		empresaId: "",
		cidade: "",
		estado: "",
		rua: "",
		bairro: "",
	});

	const [responsavel, setResponsavel] = useState({
		nome: "",
		telefone: "",
		cep: "",
		cidade: "",
		estado: "",
		rua: "",
		bairro: "",
	});

	useEffect(() => {
		async function getEmpresa() {
			try {
				const response = await apiEmpresas.get(token);
				setEmpresas(response.data);
			} catch (err) {
				setMessage({ text: "Erro ao salvar empresa" });
			}
		}

		if (local.cep.length === 8) {
			completeAddressByCep(local, setLocal, lastCep, setLastCep, setMessage);
		}

		getEmpresa();
	}, [token, local, setLocal, lastCep, setLastCep, setMessage]);

	function handlerInput(e, obj, act) {
		act({ ...obj, [e.target.name]: e.target.value });
	}

	const res = {
		nome: responsavel.nome,
		telefone: responsavel.telefone,
		cep: responsavel.cep,
	};

	const body = {
		local: { nome: local.nome, cep: local.cep, empresaId: local.empresaId },
		responsavel: { ...res },
	};

	async function save(e) {
		e.preventDefault();

		try {
			await cep(responsavel.cep);
		} catch (err) {
			console.log(err);
			setMessage({ text: "CEP inválido" });
		}

		try {
			console.log(body);
			await apiLocais.create(body, token);
			creating(false);
			setMessage({ type: "success", text: "local cadastrado" });
		} catch (err) {
			console.log(err);
			setMessage({ text: "Erro ao salvar local" });
		}
		return;
	}

	return (
		<>
			<Title>Local</Title>
			<Form
				width={"100%"}
				inputHeight={"32px"}
				onSubmit={(e) => {
					save(e);
				}}
			>
				<Grid container spacing={2}>
					<Grid xs={6}>
						<input
							required
							placeholder="Nome"
							type="text"
							name="nome"
							value={local.nome}
							onChange={(e) => handlerInput(e, local, setLocal)}
						/>
					</Grid>
					<Grid xs={6}>
						<AutoCompleteInput
							list={empresas}
							searchType="empresas"
							obj={local}
							setObj={setLocal}
						/>
					</Grid>
					<Grid xs={4}>
						<input
							required
							placeholder="Estado"
							name="estado"
							value={local.estado}
							onChange={(e) => handlerInput(e, local, setLocal)}
						/>
					</Grid>
					<Grid xs={5}>
						<input
							required
							placeholder="Cidade"
							name="cidade"
							value={local.cidade}
							onChange={(e) => handlerInput(e, local, setLocal)}
						/>
					</Grid>
					<Grid xs={3}>
						<input
							required
							placeholder="CEP"
							type="text"
							name="cep"
							value={local.cep}
							onChange={(e) => handlerInput(e, local, setLocal)}
							minLength={8}
							maxLength={8}
						/>
					</Grid>
					<Grid xs={5}>
						<input
							required
							placeholder="Rua"
							name="rua"
							value={local.rua}
							onChange={(e) => handlerInput(e, local, setLocal)}
						/>
					</Grid>
					<Grid xs={7}>
						<input
							required
							placeholder="Bairro"
							name="bairro"
							value={local.bairro}
							onChange={(e) => handlerInput(e, local, setLocal)}
						/>
					</Grid>
				</Grid>
				<Title>Responsavel</Title>
				<ResponsavelCrud obj={responsavel} setObj={setResponsavel} />
				<Row turn>
					<Button
						onClick={() => {
							window.location.replace("/locais");
						}}
					>
						Cancelar
					</Button>
					<Button type="submit">Criar</Button>
				</Row>
			</Form>
		</>
	);
}
