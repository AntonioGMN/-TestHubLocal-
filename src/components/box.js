import styled from "styled-components";

const Box = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	height: 550px;
	width: 900px;
	border-radius: 15px;

	//background: #e5e5e5;

	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	@media (max-width: 900px) {
		flex-direction: column;

		width: 100%;
		height: 100vh;
		margin: 0 15px 0 15px;
		justify-content: start;
		background-color: none;
		gap: 25px;
	}
`;

export default Box;
