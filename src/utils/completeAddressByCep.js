import cep from "cep-promise";

async function completeAddressByCep(
	obj,
	setObj,
	lastCep,
	setLastCep,
	setMessage
) {
	if (obj !== null) {
		if (obj.cep !== lastCep) {
			async function saveAddress() {
				try {
					const address = await cep(obj.cep);
					setObj({
						...obj,
						cidade: address.city,
						estado: address.state,
						rua: address.street,
						bairro: address.neighborhood,
					});
				} catch (err) {
					setObj({
						...obj,
						cidade: "",
						estado: "",
						rua: "",
						bairro: "",
					});
					setMessage({ type: "warning", text: "Cep não encontrado" });
				}
				setLastCep(obj.cep);
			}
			saveAddress();
		}
	}
	return;
}
export default completeAddressByCep;
