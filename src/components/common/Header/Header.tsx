// lib
import { useContext, useState } from "react";
import {
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
  IconButton,
  Menu,
  Divider,
  ListItemIcon,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// src
import { ContainerStyled } from "../../../styles/styled_components";
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
                <a
                  className="anchorButton"
                  href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_DATA.id}&scope=gist%20user`}
                >
                  Login
                </a>
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
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>Signed In as {auth?.user?.login}</MenuItem>
                    <MenuItem>
                      <Link className="plainAnchor" href="/create-gist">
                        Create Gist
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/your-gists">Your Gists</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/starred-gists">Starred Gists</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="https://docs.github.com/en">Help</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={auth?.user?.html_url}>
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
      </ContainerStyled>
    </HeaderContainer>
  );
};
export default Header;
