import { Container } from "../../styles/GlobalStyle"; 
import { Grid, Section } from "./styles";
import SideBar from "./Components/SideBar";
import QueryBar from "./Components/QueryBar";
import Bible from "./Components/Bible";


export default function BiblePage(){

    return(

            <Section>
                <Container>
                    <Grid>
                        <QueryBar />
                        <SideBar />
                        <Bible />
                    </Grid>
                </Container>
            </Section>
        )
}