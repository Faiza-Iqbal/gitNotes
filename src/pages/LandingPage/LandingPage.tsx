import Header from "../../components/common/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import { ContainerStyled } from "../../styles/Container.style";
import { Section } from "../../styles/Section.style";
import { FlexEnd } from "../../styles/FlexEnd.style";
import { IconButton } from "../../styles/IconButton.style";
import "../../styles.css";
import "./LandingPage.css";
import TableComponent from "../../components/common/Table/Table";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader/Loader";
const LandingPage: React.FC = () => {
    // To maintain table Data on search
    const [tableData, setTableData] = useState([]);
    // Making API response a state
    const [apiData, setApiData ]=useState([]);
   
  useEffect(()=>{
    fetch('https://api.github.com/gists?per_page=50')
    .then((response)=>response.json())
    .then((resp)=>{
      setTableData(resp);
      setApiData(resp);
      setLoader(false);
    });
  },[]);

  // To toggle Grid/List View
  const [showGrid, setShowGrid] = useState(false);
  // To search Gists by ID
  const [searchState, setSearchState] = useState('');
  // loader
  const [loader, setLoader] = useState(true);
  // search gist by id 
  const editSearchState = (e:any) : any =>{
    setSearchState(e.target.value);
    setTableData(apiData.filter((gistID:any) => gistID.id.includes(e.target.value)));
  }
  useEffect(() => {
    const url = window.location.href;
    // If user's app is authorized with github
    if(url.includes('?code'))
    {
      const code :string  = url.split('?code=')[1];
      let requestData = {
        code: code,
        client_id : '5ca6d8cb11bc7bfa2c3c',
        client_secret : '1e18a58399d5723ce2e6165980142795c9f0884a', 
      }
      fetch(`https://github.com/login/oauth/access_token?code=${code}&client_id=5ca6d8cb11bc7bfa2c3c&client_secret=1e18a58399d5723ce2e6165980142795c9f0884a`,{
        method: 'post',
        headers: {'Accept': 'application/json'},
        body : JSON.stringify(requestData)
      }).then((response) => response.json()) //check status code here, if not 200, throw error (catch block)
      .then((resp) => { //if no acess token, throw error
        const accessToken = resp.access_token;
        console.log("resp--accesstoken",resp);
        localStorage.setItem('accessToken',accessToken);
        fetch('https://api.github.com/user',{
        headers:{
          Authorization: `token ${accessToken}`,
        }
      }).then((response) => response.json())
      .then((resp) => {
        console.log("resp>>>",resp);
        // Maintaing user session
        if(resp && resp.login)
        {
          localStorage.setItem('user',JSON.stringify(resp));
          window.location.href = url.split("?")[0];
        }
      })
      });
    }
  }, [])
  return (
    <>
      <Header editSearchState={editSearchState} searchState = {searchState}/>
      <Section>
        <ContainerStyled>
          <FlexEnd>
            <IconButton onClick = {() => setShowGrid(true)} >
              <FontAwesomeIcon
                className={showGrid ? 'greenActive' : 'gridIcon'}
                icon={faBorderAll}
              ></FontAwesomeIcon>
            </IconButton>
            <IconButton onClick = {() => setShowGrid(false)}>
              <FontAwesomeIcon
               className={!showGrid ? 'greenActive' : 'listIcon'}
                icon={faList}
              ></FontAwesomeIcon>
            </IconButton>
          </FlexEnd>
          <Section>
            {loader && 
              <Loader />}
            {!showGrid && !loader &&
            <TableComponent apiData = {tableData} />}
            {showGrid && !loader &&
            <GridLayout apiData ={tableData} />}
          </Section>
        </ContainerStyled>
      </Section>
    </>
  );
};
export default LandingPage;
