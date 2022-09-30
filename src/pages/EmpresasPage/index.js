import Container from "../../components/center";
//import { Form, Button } from "../../components/form";

//import { useState } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Title from "../../components/GreyText";
import Table from "../../components/table";
import Section from "../../components/Section";

export default function EmpresasPage() {
	// const [formData, setFormData] = useState({
	// 	nome: "",
	// 	cnpj: "",
	// 	descrição: "",
	// });

	// function handlerInput(e) {
	// 	setFormData({ ...formData, [e.target.name]: e.target.value });
	// }

	return (
		<Container>
			<Box>
				<Nav />
				<Section>
					<Title>Empresas</Title>
					<Table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>UCNPJ</th>
								<th>Descrição</th>
							</tr>
						</thead>
					</Table>
				</Section>
			</Box>
			{/* <Form>
					<input
						placeholder="Nome"
						type="text"
						name="nome"
						value={formData.name}
						onChange={(e) => handlerInput(e)}
					/>
					<input
						placeholder="CNPJ"
						type="text"
						name="cnpj"
						value={formData.name}
						onChange={(e) => handlerInput(e)}
					/>
					<input
						placeholder="Descrição"
						type="text"
						name="descrição"
						value={formData.name}
						onChange={(e) => handlerInput(e)}
						maxLength={50}
					/>
					<Button type="submit">Salvar</Button>
				</Form> */}
		</Container>
	);
}
