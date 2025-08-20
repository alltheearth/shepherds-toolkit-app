import styled from "styled-components";

export const HeaderContainer = styled.header`
  
  background-color: #1565c0;
  div {
    color: white;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-block;
`;

export const Nav = styled.nav<{ open?: boolean }>`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    right: ${({ open }) => (open ? "0" : "-100%")};
    flex-direction: column;
    background: #0d6efd;
    padding: 1rem;
    width: 200px;
    transition: right 0.3s ease-in-out;
  }
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

export const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;