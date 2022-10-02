import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoCompleteInput({ empresas, local, setLocal }) {
	const nomes = [];
	empresas.forEach((l) => nomes.push(l.empresaNome));

	function findEmpresa(selected) {
		console.log({ selected });
		const empresa = empresas.find((l) => l.empresaNome === selected);
		console.log({ empresa });
		setLocal({ ...local, empresaId: empresa.empresaid });
		return;
	}

	return (
		<Autocomplete
			options={nomes}
			onChange={(e, newValue) => findEmpresa(newValue)}
			renderInput={(params) => <TextField {...params} />}
		/>
	);
}
