import Container from "../../components/center";
import { Form, Button, Line } from "../../components/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as api from "../../service/apiLogin.js";
import { useAlert } from "../../contexts/AlertContext";

export default function SignUpPage() {
	const navegate = useNavigate();
	const { setMessage } = useAlert();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// useEffect(() => {
	// 	if (token) navegate("home");
	// }, [token, navegate]);

	function handlerInput(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function hadlerSubmit(e) {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			return setMessage({ type: "warning", text: "As senhas devem ser iguais" });
		}

		const user = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
		};

		try {
			await api.signUp(user);
			navegate("/");
		} catch (error) {
			return setMessage({ type: "error", text: error });
		}

		return;
	}

	return (
		<Container>
			<Form onSubmit={(e) => hadlerSubmit(e)}>
				<input
					placeholder="Nome"
					type="text"
					name="name"
					value={formData.name}
					onChange={(e) => handlerInput(e)}
					required
				/>
				<input
					placeholder="Email"
					type="email"
					name="email"
					value={formData.email}
					onChange={(e) => handlerInput(e)}
					required
				/>
				<input
					placeholder="Senha"
					type="password"
					name="password"
					value={formData.password}
					onChange={(e) => handlerInput(e)}
					required
				/>
				<input
					placeholder="Confirme Senha"
					type="password"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={(e) => handlerInput(e)}
					required
				/>
				<Button>Cadastre-se</Button>
				<Line />
				<Button type="text" onClick={() => navegate("/login")}>
					Ir para o login
				</Button>
			</Form>
		</Container>
	);
}
