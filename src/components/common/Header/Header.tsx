import { useState } from "react";
// Importing Styled Components
import { ContainerStyled } from "../../../styles/Container.style";
import { GreenBackground } from "../../../styles/GreenBackground.style";
import { HeaderStyled } from "./Header.style";
// Importing Data
import companyDetails from "../../../data/companyDetails";
// React Components
import LogoComponent from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";
// Imports from Material Library
import { Avatar } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// Component css
import "./Header.css";
// fontawesome 
import FontAwesome from "../../Fontawesome/Fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Header = ( {editSearchState,searchState} : any) => {
  // Menu DropDown
  const [menu, setMenu] = useState(''); 
  let user: any = localStorage.getItem('user');
  user= JSON.parse(user);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setMenu(event.target.value);
  };
  // Sign out user
  const signOut = async () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = "/";
  }
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
              <input className="searchBar" type="text" placeholder="Search Notes..." value={searchState} onChange={editSearchState} />
              <FontAwesome faIcon={faSearch} />
            </NavbarItem>
            <NavbarItem>
              { !user &&
              <a className="anchorButton" href="https://github.com/login/oauth/authorize?client_id=5ca6d8cb11bc7bfa2c3c&scope=gist%20user"> Login </a>}
              { user &&
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
                     <MenuItem >Signed In as {user?.login}</MenuItem>
                     <MenuItem > <a className="plainAnchor" href="/create-gist">Create Gist</a></MenuItem>
                     <MenuItem > <a className="plainAnchor" href="/your-gists">Your Gists</a></MenuItem>
                     <MenuItem ><a className="plainAnchor" href="/starred-gists">Starred Gists</a></MenuItem>
                     <MenuItem> <a className="plainAnchor" target="_blank" href="https://docs.github.com/en">Help</a> </MenuItem>
                     <MenuItem > <a target="_blank" className="plainAnchor" href={user?.html_url}> Your GitHub Profile </a></MenuItem>
                     <MenuItem onClick={signOut} >Sign Out</MenuItem>
                   </Select>
                 </FormControl>
                </>
              }
            </NavbarItem>
          </Navbar>
        </HeaderStyled>
      </ContainerStyled>
    </GreenBackground>
  );
};
export default Header;
