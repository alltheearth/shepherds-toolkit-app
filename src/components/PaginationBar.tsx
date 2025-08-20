import styled from "styled-components"

const PaginationBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const NavButton = styled.button`
    padding: 12px 8px;
`
const Date = styled.span`
    display: inline-block;
    font-size: 22px;
    font-weight: bold;
`

const PaginationBar = () => {
    return (<>
        <PaginationBarContainer><NavButton>{'<'}
            </NavButton>
                <Date>Semana atual</Date>
            <NavButton>{'>'}</NavButton>
        </PaginationBarContainer>
    </>)
}

export default PaginationBar