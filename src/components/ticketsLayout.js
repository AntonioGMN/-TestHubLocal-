import styled from "styled-components";

const TicketsSection = styled.section`
	height: 100%;
	width: 100%;
	border-radius: 0 15px 15px 0;

	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 8px;
	overflow: auto;
	color: white;
`;

export const Ticket = styled.article`
	width: 160px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 5px;

	background: linear-gradient(40deg, #00f260, #0575e6);
	border-radius: 8px;
	color: egg-white;

	p {
		font-size: 14px;
		text-align: center;
	}

	span {
		font-size: 12px;
	}

	@media (max-width: 900px) {
		width: 100%;
	}
`;

export default TicketsSection;
