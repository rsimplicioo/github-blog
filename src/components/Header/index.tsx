import logo from "../../assets/logo.svg";

import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} />
    </HeaderContainer>
  );
}
