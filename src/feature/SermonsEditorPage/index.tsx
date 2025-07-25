import { Container } from "../../styles/GlobalStyle"
import SermonEditor from "./SermonEditor"
import { SermonContainer } from "./styles"

const SermonEditorPage = () => {
    return (
            <SermonContainer>
                <Container>
                    <SermonEditor />
                </Container>
            </SermonContainer>
            )
}

export default SermonEditorPage