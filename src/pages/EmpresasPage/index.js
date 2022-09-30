import Container from "../../components/center";
//import { Form, Button } from "../../components/form";

import { useState, useEffect } from "react";
import Box from "../../components/box";
import Nav from "../../components/nav";
import Table from "../../components/table";
import Section from "../../components/section";
import { useNavigate } from "react-router-dom";
import AddEmpresas from "./createEmpresa";

import Row from "../../components/row";
import Title from "../../components/title";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";

export default function EmpresasPage() {
	const [creating, setCreating] = useState(false);
	const { token } = useAuth();
	const navegate = useNavigate();

	useEffect(() => {
		if (!token) navegate("/login");
	}, [token, navegate]);

	return (
		<Container>
			<Box>
				<Nav />
				<Section>
					{creating ? (
						<AddEmpresas />
					) : (
						<>
							<Row>
								<Title>Empresas</Title>
								<IoIosAddCircleOutline size={25} onClick={() => setCreating(true)} />
							</Row>
							<Table>
								<thead>
									<tr>
										<th>Nome</th>
										<th>UCNPJ</th>
										<th>Descrição</th>
										<th>Responsavel</th>
									</tr>
								</thead>
							</Table>
						</>
					)}
				</Section>
			</Box>
		</Container>
	);
}
