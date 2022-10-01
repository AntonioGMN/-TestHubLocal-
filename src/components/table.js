import styled from "styled-components";

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	margin-top: 10px;

	a {
		text-decoration: none;
		color: white;
	}

	tr,
	th {
		border: 1px solid #ddd;
		padding: 8px;
	}

	tr {
		:nth-child(even) {
			background-color: #f2f2f2;
		}
		:hover {
			background-color: #ddd;
		}
	}

	th {
		/* display: flex;
		flex-direction: row;
		justify-content: center; */
		align-items: center;
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: left;
		background-color: #31cc93;
		color: white;
	}

	td {
		padding-left: 5px;
	}
`;

export default Table;
