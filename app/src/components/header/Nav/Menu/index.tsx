import { mediaQueries } from "../../../../services/media";
import React from "react";
import styled from "styled-components";
import ItemLink from "../ItemLink";

const Menu: React.FC = () => {
	return (
		<Container>
			<ItemLink link="/" title="Settings"/>
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	${mediaQueries("desktop")`
		flex: 1;
		flex-direction: column;
		justify-content: flex-end;
		margin-right: 0;
		align-items: center;
		padding-bottom: 20px;
	`}
`;
export default Menu;