import { mediaQueries } from "../../../../services/media";
import React from "react";
import styled from "styled-components";
import ItemLink from "../ItemLink";

const Navbar: React.FC = () => {
	return (
		<Container>
			<ListItem  className="nav-link active">
				<ItemLink link="/material" title="Materials"/>
			</ListItem>
			<ListItem className="nav-link">
				<ItemLink link="/lend" title="Réservations"/>
			</ListItem>
			{/* <ListItem className="nav-link">
				<ItemLink link="/add-lend" title="users"/>
			</ListItem>
			<ListItem className="nav-link">
				<ItemLink link="/" title="users"/>
			</ListItem> */}
		</Container>
	);
};

const Container = styled.ul`
	display: flex;
	flex: 1;
	flex-flow: column nowrap;
    top: 0;
	${mediaQueries("desktop")`
		width: 100%;
		flex-flow: row nowrap;
		justify-content: space-between;
		list-style: none;
		margin-top: 0;
		margin-left: 20px;
		position: static;
		align-items: center;
	`}
`;

const ListItem = styled.li`
	display: block;
	&.active {
		background-color: ${({theme})=> theme.colors.layout.tertiary};
	}
	${mediaQueries("desktop")`
		width: 80px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	`}
`;

export default Navbar;