import styled from "styled-components";

import { IoBusinessOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi";

export default function Nav() {
	return (
		<NavStyle>
			<div>
				<IoBusinessOutline size={55} />
				<p>Empresas</p>
			</div>
			<div>
				<GrMapLocation size={55} style={{ color: "blue" }} />
				<p>Locais</p>
			</div>
			<div>
				<HiOutlineTicket size={55} style={{ color: "blue" }} />
				<p>Ticket</p>
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

	//background: #a2f7c4;
	//background-image: linear-gradient(360deg, #00f260, #0575e6);
	border-radius: 15px 0 0 15px;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-size: 15px;

		background-color: none;
		border: none;
	}

	@media (max-width: 900px) {
		width: 100%;
		height: 100px;

		flex-direction: row;
		justify-content: space-evenly;
	}
`;
