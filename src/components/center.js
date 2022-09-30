import styled from "styled-components";

const Container = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	min-height: 100vh;
	background-image: linear-gradient(50deg, #00f260, #0575e6);

	@media (max-width: 700px) {
		width: 100%;
		justify-content: start;
		gap: 15px;
	}
`;

export default Container;
