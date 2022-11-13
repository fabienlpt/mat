import { mediaQueries } from "../../../services/media";
import React, { useState } from "react";
import styled from 'styled-components';
import Nav from "../Nav";

const Burger: React.FC = () => {
	const [open, setOpen] = useState(false);
    return (
        <>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
				<div />
				<div />
				<div />
			</StyledBurger>
			<Nav isopen={open}/>
        </>
    );
};

interface Props {
    open: boolean;
}

const StyledBurger = styled.div<Props>`
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 12px;
    right: 20px;
    z-index: 20;

    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;

    ${mediaQueries("desktop")`
		display: none;
	`}

    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => open ? "#ffffff" : "#ccc"};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;

        &:nth-child(1) {
            transform: ${({ open }) => open ? "rotate(45deg)" : "rotate(0)"};
        }

        &:nth-child(2) {
            transform: ${({ open }) => open ? "translateX(100%)" : "translateX(0)"};
            opacity: ${({ open }) => open ? 0 : 1};
        }

        &:nth-child(3) {
            transform: ${({ open }) => open ? "rotate(-45deg)" : "rotate(0)"};
        }
    }
`;
export default Burger;