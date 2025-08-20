// Header.tsx
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { HeaderContainer, Logo, MenuIcon, Nav, NavLink } from "./styles";
import { Container } from "@mui/material";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Container>
        <Logo>Koinonia</Logo>

      {/* <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MenuIcon> */}

      <Nav open={menuOpen}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/contatos">Contato</NavLink>
        <NavLink href="#">Login</NavLink>
      </Nav>
      </Container>
    </HeaderContainer>
  );
}
