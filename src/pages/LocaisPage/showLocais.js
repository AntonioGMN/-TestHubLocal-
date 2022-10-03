import Table from "../../components/table";
import Row from "../../components/row";
import Title from "../../components/title";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as apiLocais from "../../service/apiLocais";

export default function ShowLocais({ creating }) {
	const [locais, setLocais] = useState(null);
	const { token } = useAuth();

	useEffect(() => {
		async function getEmpresa() {
			try {
				const locais = await apiLocais.get(token);
				setLocais(locais.data);
			} catch (err) {
				console.log(err);
			}
		}

		getEmpresa();
	}, [token]);

	return (
		<>
			<Row>
				<Title>Locais</Title>
				<IoIosAddCircleOutline
					size={25}
					onClick={() => creating(true)}
					cursor="pointer"
				/>
			</Row>
			{locais ? (
				locais.length > 0 ? (
					<Table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>CEP</th>
								<th>Empresa Responsavel</th>
								<th>Responsavel</th>
							</tr>
						</thead>
						<tbody>
							{locais.map((l) => (
								<tr key={l.id}>
									<td>{l.nome}</td>
									<td>{l.cep}</td>
									<td>{l.empresaNome}</td>
									<td>{l.responsavelNome}</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					"Começe a cadastrar locais"
				)
			) : (
				"carregando"
			)}
		</>
	);
}
