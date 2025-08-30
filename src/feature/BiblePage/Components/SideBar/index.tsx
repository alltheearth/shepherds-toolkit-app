import { SideBarChapterText, SideBarTitle, SideBarChapterTitle, SideBarContainer, SideBarVerseContainer, SideBarLinksContainer, SideBarUsefulLinks } from "./styles";

export default function SideBar(){
    return(
        <SideBarContainer>
            <SideBarVerseContainer>
                <SideBarTitle>Versões alternativas</SideBarTitle>
                <SideBarChapterTitle>João 3:16</SideBarChapterTitle>
                <SideBarChapterText>Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna</SideBarChapterText>
            </SideBarVerseContainer>
            <SideBarLinksContainer>
                <SideBarTitle>
                    Links Rápidos
                </SideBarTitle>
                <SideBarUsefulLinks>Ver o versiculo em outra versão</SideBarUsefulLinks>
                <SideBarUsefulLinks>Compartilhar</SideBarUsefulLinks>
            </SideBarLinksContainer>
        </SideBarContainer>
    )
}