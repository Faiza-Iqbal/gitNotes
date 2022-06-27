// lib
import { useEffect, useState } from "react";

// data
import { CLIENT_DATA } from "../../data/clientData";

const useLandingPage = () =>{
    const [tableData, setTableData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [showGrid, setShowGrid] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [loader, setLoader] = useState(true);
  
    useEffect(() => {
      fetch("https://api.github.com/gists?per_page=50")
        .then((response) => response.json())
        .then((resp) => {
          setTableData(resp);
          setApiData(resp);
          setLoader(false);
        });
  
      const url = window.location.href;

      const loginWithGitHub =() =>{
        const code: string = url.split("?code=")[1];
  
        fetch(
          `https://github.com/login/oauth/access_token?code=${code}&client_id=${CLIENT_DATA.id}&client_secret=${CLIENT_DATA.secret}`,
          {
            method: "post",
            headers: { Accept: "application/json" },
          }
        )
          .then((response) => response.json())
          .then((resp) => {
            const accessToken = resp.access_token;
            localStorage.setItem("accessToken", accessToken);
  
            fetch("https://api.github.com/user", {
              headers: {
                Authorization: `token ${accessToken}`,
              },
            })
              .then((response) => response.json())
              .then((resp) => {
                if (resp && resp.login) {
                  localStorage.setItem("user", JSON.stringify(resp));
                  window.location.href = url.split("?")[0];
                }
              });
          });
      }
    
      if (url.includes("?code")) {
        loginWithGitHub();
      }
    }, []);
  
    const editSearchState = (e: any) => {
      setSearchState(e.target.value);
      setTableData(
        apiData.filter((apiItem: any) => apiItem.id.includes(e.target.value))
      );
    };

    return {
        tableData,
        setTableData,
        apiData,
        setApiData,
        showGrid,
        setShowGrid,
        searchState,
        setSearchState,
        loader,
        setLoader,
        editSearchState
      };

    
}
export default useLandingPage;