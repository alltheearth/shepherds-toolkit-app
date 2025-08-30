import { colors } from "../../../../styles/globalStyles"
import { styled } from "styled-components"

export const GridQueryBar = styled.div`
    display: grid;
    row-gap: 8px;
`

export const QueryBarContainer = styled.div`
    grid-column: 1 /span 8;
    padding: 32px; 
    border: 1px solid black;
    border-radius: 8px 0 0 0;
     *{
        font-family: 'Roboto', 'Helvetica Neue', sans-serif;
     }
`
export const FormQueryBar = styled.form`
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-column: 1/ span 12;
    grid-row: 1/ 1;

    grid-template-columns: repeat(12, 1fr);
    column-gap: 8px;

    && select:nth-of-type(1){
         grid-column: 1/ span 4;
    }

    && select:nth-of-type(2){
         grid-column: 5/ span 3;
    }

     && select:nth-of-type(3){
         grid-column: 8/ span 1;
    }
`
export const InputQueryBar = styled.input`
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
    grid-column: 9/ span 2;
`
export const SelectQueryBar = styled.select`
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
`
export const ButtonQueryBar = styled.button`
    background-color: ${colors.navyBlue};
    color: ${colors.white};
    padding: 8px 12px;
    grid-column: 11/ span 2;
    display: inline-block;
    border-radius: 8px;
    font-size: 17px;
    font-weight: bold;
`