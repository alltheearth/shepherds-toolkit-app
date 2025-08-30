import { Link } from "react-router-dom"
import { Container } from "../../styles/globalStyles"
import { HeaderContainer, HeaderIcon, HeaderLogo, HeaderTitle } from "./styles"


export default function Header () {
    return(
    <HeaderContainer>
        <Container>
            <div>
                <HeaderLogo src={'/logo.png'} alt="Logo Shepherd's Toolkit - Escudo com um cordeiro e dois cajados de pastores"/>
                <HeaderTitle>
                    <Link to="/">
                        Shepherd&#39;s Toolkit
                    </Link>
                </HeaderTitle>
            </div>
            <div>
               <HeaderIcon src={'icons/header/notifications.png'} />
               <HeaderIcon src={'icons/header/Avatar.png'} />
            </div>
        </Container>
    </HeaderContainer>
    )
}
