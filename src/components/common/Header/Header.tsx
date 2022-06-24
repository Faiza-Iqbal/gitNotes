// lib
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

// src
import { ContainerStyled } from "../../../styles/Container.style";
import { HeaderContainer } from "../../../styles/HeaderContainer.style";
import { HeaderStyled } from "./Header.style";
import companyDetails from "../../../data/companyDetails";
import LogoComponent from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";

// data
import { CLIENT_DATA } from "../../../data/clientData";

// style
import "./Header.css";

type HeaderProps = {
  editSearchState: any;
  searchState: string;
};

const Header = ({ editSearchState, searchState }: HeaderProps) => {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  let user: any = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  user = JSON.parse(user);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setMenu(event.target.value);
  };

  // const signOut = async () => {
  //   let response = await fetch(
  //     `https://api.github.com/applications/${CLIENT_DATA.id}/grant`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `token ${accessToken}`,
  //       },
  //       body: JSON.stringify({ access_token: accessToken }),
  //     }
  //   );
  //   if (response.status === 204) {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("accessToken");
  //   } else return false;
  // };
  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/");
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
              {!user && (
                <a
                  className="anchorButton"
                  href="https://github.com/login/oauth/authorize?client_id=5ca6d8cb11bc7bfa2c3c&scope=gist%20user"
                >
                  {" "}
                  Login{" "}
                </a>
              )}
              {user && (
                <>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      <Avatar src={user?.avatar_url} alt={user?.login} />
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={menu}
                      onChange={handleSelectChange}
                      label="Menu"
                      className="avatarDropDown"
                    >
                      <MenuItem>Signed In as {user?.login}</MenuItem>
                      <MenuItem>
                        {" "}
                        <a className="plainAnchor" href="/create-gist">
                          Create Gist
                        </a>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <a className="plainAnchor" href="/your-gists">
                          Your Gists
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a className="plainAnchor" href="/starred-gists">
                          Starred Gists
                        </a>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <a
                          className="plainAnchor"
                          target="_blank"
                          rel="noreferrer"
                          href="https://docs.github.com/en"
                        >
                          Help
                        </a>{" "}
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <a
                          target="_blank"
                          className="plainAnchor"
                          rel="noreferrer"
                          href={user?.html_url}
                        >
                          {" "}
                          Your GitHub Profile{" "}
                        </a>
                      </MenuItem>
                      <MenuItem onClick={signOut}>Sign Out</MenuItem>
                    </Select>
                  </FormControl>
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
