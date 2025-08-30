import styled, { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #2C3E50;

    h1, h2, h3, h4, h5, h6, strong, button {
      font-family: "Inter", sans-serif;
    }
  }
`;

export const colors = {
    navyBlue: '#2C3E50',
    blue: '#3498DB',
    yellow: '#FFC107',
    black: '#000',
    white: '#FFF',
    green: '#25A67A',
    red: '#dc3545'
}

export const Container = styled.div`
    max-width: 1024px;
    margin: 0 auto;
`
export default GlobalStyle;