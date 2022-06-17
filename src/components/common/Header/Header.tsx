import "./Header.css";
import { ContainerStyled } from "../../../styles/Container.style";
import { GreenBackground } from "../../../styles/GreenBackground.style";
import { HeaderStyled } from "./Header.style";
import companyDetails from "../../../data/companyDetails";
import LogoComponent from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import NavbarItem from "../Navbar/NavbarItem";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FontAwesome from "../../Fontawesome/Fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { json } from "stream/consumers";

const Header = ( {editSearchState,searchState} : any) => {
  const [age, setAge] = useState('');
  // console.log("editSearchState",editSearchState);
  let user: any = localStorage.getItem('user');
  user= JSON.parse(user);
  console.log("user?.login",user);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
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
            </NavbarItem>
            <NavbarItem>
              { (!user || user.message) &&
              <a className="anchorButton" href="https://github.com/login/oauth/authorize?client_id=5ca6d8cb11bc7bfa2c3c"> Login </a>
                
              }
              { user &&
                <>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                   <InputLabel id="demo-simple-select-standard-label"><Avatar src={user?.avatar_url} alt={user?.login} /></InputLabel>
                   <Select
                     labelId="demo-simple-select-standard-label"
                     id="demo-simple-select-standard"
                     value={age}
                     onChange={handleChange}
                     label="Age"
                     className="avatarDropDown"
                   >
                     <MenuItem value={10}>Signed In as {user?.login}</MenuItem>
                     <MenuItem value={20}>Your Gists</MenuItem>
                     <MenuItem value={30}>Starred Gists</MenuItem>
                     <MenuItem value={40}>Help</MenuItem>
                     <MenuItem value={50}>Your GitHub Profile</MenuItem>
                     <MenuItem value={60}>Sign Out</MenuItem>
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
