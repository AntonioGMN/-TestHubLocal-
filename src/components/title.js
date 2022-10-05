import styled from "styled-components";

const Title = styled.h1`
	max-width: ${(props) => (props.width ? "462px" : "100%")};
	font-family: Roboto;
	font-size: 30px;
	font-weight: 400;
	line-height: 23px;
	letter-spacing: 0em;
	text-align: center;
	text-align: ${(props) => props.align || "center"};

	align-self: flex-start;

	margin-bottom: 16px;

	color: #31cc93;
`;

export default Title;
