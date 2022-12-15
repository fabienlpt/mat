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
				<ItemLink link="/lend" title="Réservations owo"/>
			</ListItem>
			<ListItem className="nav-link">
				<ItemLink link="/" title="Settings"/>
			</ListItem>
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
		justify-content: space-around;
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
		background-color: #FFFFFF;
	}
	${mediaQueries("desktop")`
		width: 120px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	`}
`;

export default Navbar;