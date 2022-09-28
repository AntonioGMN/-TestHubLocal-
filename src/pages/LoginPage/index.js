import Container from "../../components/center";
import { Form, Button, Line } from "../../components/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import * as api from "../../service/apiLogin";
import { useAuth } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";

export default function LoginPage() {
	const navegate = useNavigate();
	const { persistLogin } = useAuth();
	const { setMessage } = useAlert();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	// useEffect(() => {
	// 	if (token) navegate("home");
	// }, [token, navegate]);

	function handlerInput(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	async function hadlerSubmit(e) {
		e.preventDefault();

		try {
			const response = await api.login(user);
			console.log(response);
			const token = response.data;
			persistLogin(token);
			//navegate("/home");
		} catch (error) {
			return setMessage({ text: error.response.data });
		}

		return;
	}
	return (
		<Container>
			<Form onSubmit={(e) => hadlerSubmit(e)}>
				<input
					placeholder="Email"
					type="email"
					name="email"
					value={user.email}
					onChange={(e) => handlerInput(e)}
				/>
				<input
					placeholder="Senha"
					type="password"
					name="password"
					value={user.password}
					onChange={(e) => handlerInput(e)}
				/>
				<Button type="submit">Entrar</Button>
				<Line />
				<Button type="text" onClick={() => navegate("/signUp")}>
					Cadastre-se
				</Button>
			</Form>
		</Container>
	);
}
