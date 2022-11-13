import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";  

interface IProps {
	link: string;
	title: string;
}
const ItemLink: React.FC<IProps> = (props) => {
	return (
		<Container to={ props.link }>
			{props.title}
		</Container>
	);};
const Container = styled(Link)`
	color: ${({theme})=> theme.colors.text.primary};
	font-size: ${({theme})=> theme.fontSize.title};
	&:hover {
		color: ${({theme})=> theme.colors.text.secondary};
	}
`;
export default ItemLink;