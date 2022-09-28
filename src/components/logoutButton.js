import styled from "styled-components";

const LogoutButton = styled.button`
	width: 60px;
	height: 40px;
	margin: 10px 10px 0 0;

	border: 1px solid rgb(48 51 47 / 25%);
	border-radius: 12px;
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
	background: #04aa6d;

	align-items: center;
	font-style: normal;
	font-size: 12px;
	font-weight: 700;
	line-height: 18px;
	text-align: center;
	color: #ffffff;

	position: absolute;
	top: 0;
	right: 0;

	@media (max-width: 700px) {
		width: 100%;
		margin: 0;
	}
`;

export default LogoutButton;
