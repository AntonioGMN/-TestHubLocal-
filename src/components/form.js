import styled from "styled-components";

export const Form = styled.form`
	width: ${(pros) => (pros.width ? "100%" : "380px")};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12px;
	margin-bottom: 16px;

	@media (max-width: 700px) {
		width: 100%;
	}

	input {
		all: unset;
		box-sizing: border-box;

		width: 100%;
		height: ${(pros) => (pros.inputHeight ? pros.inputHeight : "62px")};

		color: #000;
		font-size: 18px;

		background: #ffffff;
		padding: 21px;
		border: 1px solid rgb(48 51 47 / 25%);
		border-radius: 12px;
		box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

		::placeholder {
			color: #9c9c9c;
			font-family: "Lexend Deca", sans-serif;
		}
	}
`;

export const Button = styled.button`
	all: unset;
	box-sizing: border-box;
	border-radius: 12px;

	width: 100%;

	font-style: normal;
	font-size: 14px;
	font-weight: 700;
	line-height: 18px;
	text-align: center;
	color: #ffffff;

	padding: 16px;
	background: #04aa6d;
	border-radius: 12px;
`;

export const Line = styled.hr`
	width: 100%;
	border: none;
	//border-top: 1px solid white;
	height: 10px;
	overflow: visible;
	color: white;
	text-align: center;

	::after {
		content: "ou";
		display: inline-block;
		position: relative;
		top: -0.5em;
		font-size: 22px;
		padding: 0 0.3em;
		//background: white;
		font-size: 22px;
		line-height: 24px;
	}
`;
