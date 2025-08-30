import { colors } from '../../styles/globalStyles'
import styled from "styled-components";

export const HeaderContainer = styled.header`
    background-color: #2C3E50;
    color: #fff;
    padding: 12px 0;

    && > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    && > div > div {
        display: flex;
        align-items: center;
    }
`
export const HeaderTitle = styled.h1`
    font-size: 22px;
    display: inline-block;
    margin: 0;
    font-weight: 600;

    a{
        text-decoration: none;
        color: ${colors.white};
    }
`
export const HeaderLogo = styled.img`
    width: 40px;
    padding-right: 8px;
`

export const HeaderIcon = styled.img`
    width: 30px;
    display: inline-block;
    margin-left: 8px;
`