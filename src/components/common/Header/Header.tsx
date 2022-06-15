import "./Header.css";
import { ContainerStyled } from "../../../styles/Container.style";
import { GreenBackground } from "../../../styles/GreenBackground.style";
import { HeaderStyled } from "./Header.style";
import companyDetails from "../../../data/companyDetails";
import LogoComponent from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";
import Button from "../Button/Button";

const Header:React.FC = () => {
  const login = () => {};
  return (
    <GreenBackground>
      <ContainerStyled>
        <HeaderStyled>
          <LogoComponent
            url={companyDetails.url}
            logo={companyDetails.logo}
            name={companyDetails.name}
          />
          {/* Navbar Accepting children props */}
          <Navbar>
            <NavbarItem>
              <SearchBar />
            </NavbarItem>
            <NavbarItem>
              <Button handleClick={login} label="Login" />
            </NavbarItem>
          </Navbar>
        </HeaderStyled>
      </ContainerStyled>
    </GreenBackground>
  );
};
export default Header;
