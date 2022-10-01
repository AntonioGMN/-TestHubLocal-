import Table from "../../components/table";
import Row from "../../components/row";
import Title from "../../components/title";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as apiEmpresas from "../../service/apiEmpresas";

export default function ShowEmpresas({ creating }) {
	const [empresas, setEmpresas] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		async function getEmpresa() {
			try {
				const empresas = await apiEmpresas.get(token);
				setEmpresas(empresas.data);
			} catch (err) {
				console.log(err);
			}
		}

		getEmpresa();
	}, [token]);

	return (
		<>
			<Row>
				<Title>Empresas</Title>
				<IoIosAddCircleOutline
					size={25}
					onClick={() => creating(true)}
					cursor="pointer"
				/>
			</Row>
			{empresas ? (
				empresas.length > 0 ? (
					<Table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>CNPJ</th>
								<th>Descrição</th>
								<th>Responsavel</th>
							</tr>
						</thead>
						<tbody>
							{empresas.map((emp) => (
								<tr key={emp.id}>
									<td>{emp.empresaNome}</td>
									<td>{emp.cnpj}</td>
									<td>{emp.descricao}</td>
									<td>{emp.nome}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					"Começe a cadastra empresas"
				)
			) : (
				"carregando"
			)}
		</>
	);
}
