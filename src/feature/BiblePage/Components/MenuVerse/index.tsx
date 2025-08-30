import { MenuContainer } from "./styles"

const MenuVerse = ({display}:{display: "none" | "block"}) => {

    return (
       <>
            <MenuContainer display={display}>
                <img src="/icons/verse/favoritar.png" alt="" />
                <img src="/icons/verse/copiar.png" alt="" />
                <img src="/icons/verse/anotar.png" alt="" />
                <img src="/icons/verse/editar.png" alt="" />    
            </MenuContainer>
       </>
    )
}

export default MenuVerse