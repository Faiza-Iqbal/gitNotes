// lib
import { useContext, useState } from "react";
import {
  Container,
  Avatar,
  MenuItem,
  Box,
  IconButton,
  Menu,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// src
import { HeaderContainer } from "../../../styles/styled_components";
import { HeaderStyled } from "./Header.style";
import LogoComponent from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";
import userContext from "../../../context/userContext";
import companyDetails from "../../../constants/companyDetails";
import { CLIENT_DATA } from "../../../constants/clientData";

// utils
import { deleteUser } from "../../../utils/GenericFunctions";

// style
import "./Header.scss";
import "../../../styles/colorVariables";

type HeaderProps = {
  editSearchState: any;
  searchState: string;
};

const Header = ({ editSearchState, searchState }: HeaderProps) => {
  const auth = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    deleteUser();
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderStyled>
          <LogoComponent
            url={companyDetails.url}
            logo={companyDetails.logo}
            name={companyDetails.name}
          />
          {/* Navbar Accepting children props */}
          <Navbar>
            <NavbarItem>
              <input
                className="searchBar"
                type="text"
                placeholder="Search Notes..."
                value={searchState}
                onChange={editSearchState}
              />
              <SearchIcon className="searchIcon" />
            </NavbarItem>
            <NavbarItem>
              {!auth?.user.login && (
                <Link
                  href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_DATA.id}&scope=gist%20user`}
                >
                  Login
                </Link>
              )}
              {auth?.user.login && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={auth?.user?.avatar_url}
                        alt={auth?.user?.login}
                      />
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>Signed In as {auth?.user?.login}</MenuItem>
                    <MenuItem>
                      <Link style={menuLink} href="/create-gist">
                        Create Gist
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link style={menuLink} href="/your-gists">
                        Your Gists
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link style={menuLink} href="/starred-gists">
                        Starred Gists
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link style={menuLink} href="https://docs.github.com/en">
                        Help
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link style={menuLink} href={auth?.user?.html_url}>
                        Your GitHub Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={signOut}>Sign Out</MenuItem>
                  </Menu>
                </>
              )}
            </NavbarItem>
          </Navbar>
        </HeaderStyled>
      </Container>
    </HeaderContainer>
  );
};

const menuLink = {
  textDecoration: "none",
  color: "black",
  opacity: "0.8",
  fontWeight: "normal",
  margin: "0",
  padding: "0",
};
export default Header;
