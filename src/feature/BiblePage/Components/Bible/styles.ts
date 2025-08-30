import styled from "styled-components";

export const BibleContainer = styled.div`
    background-color: white;
    grid-column: 1/ span 8;
    border: 1px solid black;
    border-top: none;
    grid-row: 2/ span 16;
    padding: 32px;
    overflow-y: scroll;
    border-radius: 0 0 0 8px;
`

export const TitleChapter = styled.h2`
    font-size: 22px;
    margin: 0;
`
export const VerseContainer = styled.p`
display: flex;
 font-size: 18px;
 line-height: 1.7;
 position: relative;
 &&:hover {
    background-color: pink;
 }

 && span:first-of-type {
    padding-right:  8px;
    font-weight: 500;
    color: #555;
 }
`
export const VerseContent = styled.span`
    display: inline-block;
`