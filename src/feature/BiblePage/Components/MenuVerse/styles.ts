import styled from "styled-components";

export const MenuContainer = styled.div<{display:"none" | "block"}>`
display: ${props => props.display};
    z-index: 100;
    background-color: white;
    position: absolute;
    right: 0;
    width: 36px;
    && img{
        width: 24px;
        display: block;
    }
`