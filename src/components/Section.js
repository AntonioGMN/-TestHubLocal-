import styled from "styled-components";

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	min-height: 300px;
	max-height: 600px;
	width: 80%;

	position: static;
	overflow: auto;

	@media (max-width: 700px) {
		width: 100%;
		min-height: none;
		max-height: none;
	}
`;

export default Section;
