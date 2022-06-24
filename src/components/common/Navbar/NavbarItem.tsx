import { ListItemStyled } from "../../../styles/ListItemStyled";

interface Props {
  children: React.ReactNode;
}
const NavbarItem: React.FC<Props> = ({ children }) => {
  return <ListItemStyled>{children}</ListItemStyled>;
};
export default NavbarItem;
