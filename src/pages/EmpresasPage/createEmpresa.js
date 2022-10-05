import { Form, Button } from "../../components/form";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import Title from "../../components/title";
import * as api from "../../service/apiEmpresas";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import Row from "../../components/row";
import ResponsavelCrud from "../../components/responsaveisCrud";
import cep from "cep-promise";

export default function AddrEmpresas({ creating }) {
	const { token } = useAuth();
	const { setMessage } = useAlert();
	const [empresa, setEmpresa] = useState({
		nome: "",
		cnpj: "",
		descricao: "",
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

	function handlerInput(e, obj, act) {
		act({ ...obj, [e.target.name]: e.target.value });
	}

	async function handlerSubmit(e) {
		e.preventDefault();

		try {
			await cep(responsavel.cep);
		} catch (err) {
			setMessage({ text: "Cep invalido2" });
			return;
		}

		try {
			const body = {
				empresa: { ...empresa },
				responsavel: {
					nome: responsavel.nome,
					telefone: responsavel.telefone,
					cep: responsavel.cep,
				},
			};
			await api.create(body, token);
			creating(false);
			setMessage({ type: "success", text: "empresa cadastrada" });
		} catch (err) {
			setMessage({ text: err.message });
		}
		return;
	}

	return (
		<>
			<Title>Empresa</Title>
			<Form width={"100%"} inputHeight={"35px"} onSubmit={(e) => handlerSubmit(e)}>
				<Grid container spacing={2}>
					<Grid xs={8}>
						<input
							required
							placeholder="Nome"
							type="text"
							name="nome"
							value={responsavel.name}
							onChange={(e) => handlerInput(e, empresa, setEmpresa)}
						/>
					</Grid>
					<Grid xs={4}>
						<input
							required
							placeholder="CNPJ"
							type="text"
							name="cnpj"
							value={responsavel.name}
							onChange={(e) => handlerInput(e, empresa, setEmpresa)}
						/>
					</Grid>
					<Grid xs={12}>
						<input
							required
							placeholder="Descrição"
							type="text"
							name="descricao"
							value={responsavel.name}
							onChange={(e) => handlerInput(e, empresa, setEmpresa)}
						/>
					</Grid>
				</Grid>
				<Title>Responsavel</Title>
				<ResponsavelCrud obj={responsavel} setObj={setResponsavel} />
				<Row turn>
					<Button
						type="text"
						onClick={() => {
							window.location.replace("/");
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
