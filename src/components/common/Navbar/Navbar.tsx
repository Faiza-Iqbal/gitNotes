// src
import { ListStyled } from "../../../styles/styled_components";
import { NavStyled } from "../../../styles/styled_components";

interface Props {
  children: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <NavStyled>
      <ListStyled>{children}</ListStyled>
    </NavStyled>
  );
};
export default Navbar;
