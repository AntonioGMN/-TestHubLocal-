import styled from "styled-components";

import { IoBusinessOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
	const { logout, token } = useAuth();
	const navegate = useNavigate();

	return (
		<NavStyle>
			<div onClick={() => navegate("/")}>
				<IoBusinessOutline size={55} />
				<p>Empresas</p>
			</div>
			<div onClick={() => navegate("/locais")}>
				<GrMapLocation size={55} />
				<p>Locais</p>
			</div>
			<div>
				<HiOutlineTicket size={55} />
				<p>Ticket</p>
			</div>
			<div onClick={() => logout(token)}>
				<AiOutlineLogout size={55} />
				<p>Logout</p>
			</div>
		</NavStyle>
	);
}

const NavStyle = styled.nav`
	display: flex;
	flex-direction: column;
	align-items: center;

	height: 100%;
	width: 10%;
	padding-top: 15px;
	gap: 25px;

	border-radius: 15px 0 0 15px;

	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-size: 15px;

		background-color: none;
		border: none;

		:hover {
			cursor: pointer;
			opacity: 0.7;
		}
	}

	@media (max-width: 900px) {
		width: 100%;
		height: 100px;

		flex-direction: row;
		justify-content: space-evenly;
	}
`;
