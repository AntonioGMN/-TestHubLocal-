import styled from "styled-components";

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100%;
	width: 90%;

	background: white;
	border-radius: 0 15px 15px 0;

	@media (max-width: 900px) {
		//width: 100%;
		border-radius: 15px;
	}
`;

export default Section;
