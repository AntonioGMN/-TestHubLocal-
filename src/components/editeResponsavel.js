// import Table from "../../components/table";
// import Row from "../../components/row";
// import Title from "../../components/title";
// import { IoIosAddCircleOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import Title from "./title";
//import cep from "cep-promise";
import Table from "./table";

import Row from "./row";
//import { useAuth } from "../contexts/AuthContext";
//import { useAlert } from "../contexts/AlertContext";

//import * as apiLocais from "../service/apiLocais";

import { IoIosAddCircleOutline } from "react-icons/io";
//import { BiPencil } from "react-icons/bi";
//import Table from "./table";
import Section from "./section";

export default function EditeResponsavel({ obj, setObj }) {
	const [principal, setPrincipal] = useState(null);
	// //const [responsaveis, setResponsaveis] = useState(null);
	// const { token } = useAuth();
	// const { setMessage } = useAlert();

	useEffect(() => {
		const princ = obj.find((r) => r.principal === true);
		setPrincipal(princ);
	}, [obj]);

	console.log(principal);

	//const handleOpen = () => setOpen(true);

	console.log(obj);

	// async function save(e) {
	// 	e.preventDefault();

	// 	try {
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	return;
	// }

	// function handlerInput(e, obj, act) {
	// 	act({ ...obj, [e.target.name]: e.target.value });
	// }

	return (
		principal && (
			<>
				<Row>
					<Title>Responsaveis</Title>
					<IoIosAddCircleOutline
						color="#31cc93"
						size={25}
						onClick={() => console.log(obj)}
						cursor="pointer"
					/>
				</Row>
				<Section>
					<Row>
						<Table>
							<thead>
								<tr>
									<th>Nome</th>
									<th>CEP</th>
									<th>Empresa Responsavel</th>
								</tr>
							</thead>
							<tbody>
								{obj.map((l) => (
									<tr key={l.id}>
										<td>{l.nome}</td>
										<td>{l.telefone}</td>
										<td>{l.cep}</td>
									</tr>
								))}
							</tbody>
						</Table>
						<div>
							<h2>Principal</h2>
							<p>Nome: {principal.nome}</p>
							<p>Telefone: {principal.telefone}</p>
							<p>Endereço: {principal.cep}</p>
						</div>
					</Row>
				</Section>
			</>
		)
	);
}
