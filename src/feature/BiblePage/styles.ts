import styled from "styled-components";

export const Section = styled.section`
    margin: 64px 0;
`

export const Grid = styled.div`
    width: 100%;
    height: calc(100vh - 128px);
    background-color: #FBF6EA;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(16, 1fr);

    * { font-family: 'Merriweather', 'Georgia', serif;
    }
`