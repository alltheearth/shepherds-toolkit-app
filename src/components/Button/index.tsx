// Button.tsx
import { colors } from "../../styles/globalStyles";
import type { ReactNode } from "react";
import styled from "styled-components";

type ButtonType = 'primary' | 'secundary' | 'common' | 'danger' | 'alert';


interface ContainerButtonProps {
  $type?: ButtonType;
}

const ContainerButton = styled.button<ContainerButtonProps>`
  padding: 6px 12px;
  background-color: ${({ $type }) => {
    if ($type === 'primary') return colors.blue;
    // if ($type === 'secundary') return colors.gray;
    if ($type === 'common') return colors.white;
    if ($type === 'danger') return colors.red;
    if ($type === 'alert') return colors.yellow;
    return colors.navyBlue; // fallback padrão
  }};
  color: ${({ $type }) => {
    // if ($type === 'primary') return colors.blue;
    // if ($type === 'secundary') return colors.gray;
    // if ($type === 'common') return colors.white;
    // if ($type === 'danger') return colors.red;
    if ($type === 'alert') return colors.navyBlue;
    return colors.white; // fallback padrão
  }};
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

interface ButtonProps {
  onClick?: () => void;
  type: ButtonType;
  children: ReactNode;
}

export default function Button({ onClick, type, children }: ButtonProps) {
  return <ContainerButton onClick={onClick} $type={type}>{children}</ContainerButton>;
}
