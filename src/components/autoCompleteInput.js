import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutoCompleteInput({
	searchType,
	list,
	obj,
	setObj,
	placeholder,
	defaultValue,
}) {
	const nomes = [];
	if (searchType === "empresas") list.forEach((l) => nomes.push(l.empresaNome));
	if (searchType === "local") list.forEach((l) => nomes.push(l.nome));
	if (searchType === "user") list.forEach((l) => nomes.push(l.name));

	function search(selected) {
		if (searchType === "empresas") {
			const empresa = list.find((l) => l.empresaNome === selected);
			setObj({ ...obj, empresaId: empresa.empresaid });
		}

		if (searchType === "local") {
			const local = list.find((l) => l.nome === selected);
			setObj({ ...obj, localId: local.id });
		}

		if (searchType === "user") {
			const user = list.find((l) => l.name === selected);
			setObj({ ...obj, usuarioId: user.id });
		}

		return;
	}

	return (
		<Autocomplete
			options={nomes}
			onChange={(e, newValue) => search(newValue)}
			renderInput={(params) => <TextField {...params} />}
			placeholder={placeholder}
		/>
	);
}
