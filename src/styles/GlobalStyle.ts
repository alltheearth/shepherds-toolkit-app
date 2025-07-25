// src/styles/GlobalStyle.ts
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
export const Container = styled.div`
    width: 960px;
    min-height: 100vh;
    margin: 0 auto;
`

export default GlobalStyle
