import { mediaQueries } from "../../../services/media";
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

interface IProps {
	isopen: boolean;
};

const Nav: React.FC<IProps> = ({isopen}) => {
	return (
		<Container isopen={isopen}>
			<Navbar/>
		</Container>
	);
};

const Container = styled.div<IProps>`
    display: flex;
    flex-direction: column;
    background-color: ${({theme})=> theme.colors.layout.secondary};
    transform: ${({ isopen }) => isopen ? "translateY(0)" : "translateY(-200%)"};
    transition: transform 0.3s ease-in-out;
    position: absolute;
    z-index: 1;
    top: 60px;
    left: 0;
    height: 30vh;
    width: 100%;
    ${mediaQueries("desktop")`
        z-index: 1;
        transform: none;
        transition: none;
        position: static;
        background-color: transparent;
        width: 100%;
        height: 100%;
        flex-flow: row nowrap;
        justify-content: space-between;
	`}
`;
export default Nav;
