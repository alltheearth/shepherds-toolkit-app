import styled from "styled-components";

export const SideBarContainer = styled.div`
    grid-column: 9 /span 4;
    grid-row: 1 / span 16;
    border-right: 1px solid black;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-radius: 0 8px 8px 0;
    
`
export const SideBarVerseContainer = styled.div`
    padding: 32px;
    border-bottom: 1px solid black;
    line-height: 1.6;
`

export const SideBarTitle = styled.h3`
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
`
export const SideBarChapterTitle = styled.h4`
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 12px;
`
export const SideBarChapterText = styled.p`
    font-size: 16px;
    margin: 0;
    font-family: 'Roboto', 'Helvetica Neue', sans-serif;
`
export const SideBarLinksContainer = styled.div`
    padding: 32px;
    line-height: 1.6;
`
export const SideBarUsefulLinks = styled.h4`
    font-family: 'Roboto', 'Helvetica Neue', sans-serif
`