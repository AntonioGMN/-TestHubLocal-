import styled from "styled-components";

const ModelStyle = styled.div`
	width: 400px;
	height: 400px;

	position: absolute;
	top: 50%;
	left: 50%;

	background-color: white;
	padding: 5px;
	transform: translate(-50%, -50%);
	box-shadow: none;
	border: none;
	border-style: none;

	@media (max-width: 700px) {
		width: 100%;
	}
`;

export default ModelStyle;
