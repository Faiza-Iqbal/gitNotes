import { ListStyled } from "../../../styles/ListStyled";
import { NavStyled } from "../../../styles/NavStyled";
interface Props{
  children: React.ReactNode;
}
const Navbar: React.FC <Props>  = ({ children }) => {
  return (
    <NavStyled>
      <ListStyled>{children}</ListStyled>
    </NavStyled>
  );
};
export default Navbar;
