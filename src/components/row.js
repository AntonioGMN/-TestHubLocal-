import styled from "styled-components";

const Row = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 12px;

	@media (max-width: 900px) {
		flex-direction: ${(props) => props.turn && "column-reverse"};
	}
`;

export default Row;
