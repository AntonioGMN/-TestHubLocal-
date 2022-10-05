import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import completeAddressByCep from "../utils/completeAddressByCep";
import cep from "cep-promise";

export default function ResponsavelCrud({ obj, setObj }) {
	const [lastCep, setLastCep] = useState();
	const { setMessage } = useAlert();
	function handlerInput(e) {
		setObj({ ...obj, [e.target.name]: e.target.value });
	}

	useEffect(() => {
		async function validCep() {
			try {
				await cep(obj.cep);
				return true;
			} catch (err) {
				console.log(err);
			}
		}

		if (obj.cep.length === 8) {
			validCep();
			completeAddressByCep(obj, setObj, lastCep, setLastCep, setMessage);
		}
	}, [obj, setObj, lastCep, setLastCep, setMessage]);

	return (
		<>
			<Grid container spacing={2}>
				<Grid xs={6}>
					<input
						required
						placeholder="Nome"
						type="text"
						name="nome"
						value={obj.name}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
				<Grid xs={3}>
					<input
						required
						placeholder="Telefone"
						type="text"
						name="telefone"
						value={obj.telefone}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
				<Grid xs={3}>
					<input
						required
						placeholder="CEP"
						type="text"
						name="cep"
						value={obj.cep}
						onChange={(e) => handlerInput(e)}
						minLength={8}
						maxLength={8}
					/>
				</Grid>
				<Grid xs={9}>
					<input
						required
						placeholder="Cidade"
						name="cidade"
						value={obj.cidade}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
				<Grid xs={3}>
					<input
						required
						placeholder="Estado"
						name="estado"
						value={obj.estado}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
				<Grid xs={6}>
					<input
						required
						placeholder="Rua"
						name="rua"
						value={obj.rua}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
				<Grid xs={6}>
					<input
						required
						placeholder="Bairro"
						name="bairro"
						value={obj.bairro}
						onChange={(e) => handlerInput(e)}
					/>
				</Grid>
			</Grid>
		</>
	);
}
