import { Form, Button } from "../../components/form";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import Title from "../../components/title";
import * as api from "../../service/apiEmpresas";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import Row from "../../components/row";
import ResponsavelCrud from "../../components/responsaveisCrud";

export default function Addresponsavels({ creating }) {
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

	const res = {
		nome: responsavel.nome,
		telefone: responsavel.telefone,
		cep: responsavel.cep,
	};

	const body = { empresa: { ...empresa }, responsavel: { ...res } };

	async function save() {
		try {
			console.log(empresa);
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
			<Form width={"100%"} inputHeight={"35px"}>
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
			</Form>
			<Title>Reponsavel</Title>
			<ResponsavelCrud obj={responsavel} setObj={setResponsavel} />
			<Row>
				<Button
					onClick={() => {
						window.location.replace("/");
					}}
				>
					Canselar
				</Button>
				<Button
					onClick={() => {
						save();
					}}
				>
					Criar
				</Button>
			</Row>
		</>
	);
}
