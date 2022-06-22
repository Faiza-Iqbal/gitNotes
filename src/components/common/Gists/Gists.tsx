// Material UI imports
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from '@mui/material';
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCodeFork,
  } from "@fortawesome/free-solid-svg-icons";
  // Component css
import './Gists.css';
// React components
import Header from '../Header/Header';
import { Section } from '../../../styles/Section.style';
import { showDateInDays } from '../GenericFunctions/GenericFunctions';
import ViewFileContent from '../ViewFileContent/ViewFileContent';
import StarWithCount from '../StarWithCount/StarWithCount';
// Material styled Item 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: 200,
  }));

const Gists =({apiData}:any)=>{
  console.log("apiDataaaa", apiData);
  let user:any = localStorage.getItem('user');
  user= JSON.parse(user);
return(
    <>
    <Header />
    <Section>
    <div className="innerWrapper">
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} >
          <Grid container alignItems="center">
              <Grid item >
              <Avatar src={user?.avatar_url} alt={user?.login} style ={{width: '250px', height: '250px',marginBottom: '30px'}}  />
              <Typography style={{color: "black", fontSize: "16px", textAlign: 'center'}}>{user?.login}</Typography>
              <a className='blueAnchor' target="_blank" href={user.html_url}>View GitHub Profile </a>
              </Grid>
              </Grid>
        </Grid>
        <Grid item xs={2} sm={8} md={8} >
          {apiData.map((apiItem:any,index:number)=> 
          <div key={`${index}`}>
             <Grid  container alignItems="center" className="pd-btm50">
            <Grid item lg={1}>
            <Avatar src={user?.avatar_url} alt={user?.login}/>
            </Grid>
            <Grid item lg={8}>
            <Typography color = "blue">{user?.login}</Typography>
            <Typography style= {{color: "gray", fontSize: "14px"}}>Created {showDateInDays(apiItem?.created_at)} </Typography> 
            <p style={{color: "gray", fontSize: "10px"}}>Broadcast Server </p> 
            </Grid>
            <Grid item lg={3}>
              <StarWithCount id={apiItem?.id} count = {0} />
              <span className="spanWrap">
              <FontAwesomeIcon className="blueIcon" icon={faCodeFork}></FontAwesomeIcon>    
              <span>Fork</span>
              <span className="counter">0</span>
              </span>
            </Grid>
            </Grid>
          <Item >
            <Grid container alignItems="center">
            {
                apiData.length == 0 &&
                <h3>You Have No starred Gists Yet</h3>
              }
              {
                apiData.length > 0 &&
                <ViewFileContent file={apiData[index]?.files[Object.keys(apiData[index]?.files)[0]]?.raw_url}/>
              // {/* <ViewFileContent file="https://gist.githubusercontent.com/Faiza-Iqbal/7d801214e92ecded8fa4a07f30b1ed3f/raw/aaaca87aad30ddaa3989fc2f5812684be13176d6/test.js"/> */}
              }
              </Grid>  
          </Item>
          </div>
          )}
      
        </Grid>
    </Grid>
  </Box>
  </div>
  </Section>
    </>
);
}
export default Gists;