import { ListItemStyled } from "../../../styles/styled_components";

interface Props {
  children: React.ReactNode;
}

const NavbarItem: React.FC<Props> = ({ children }) => {
  return <ListItemStyled>{children}</ListItemStyled>;
};
export default NavbarItem;
