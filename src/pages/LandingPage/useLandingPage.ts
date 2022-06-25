import { useEffect, useState } from "react";
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
  
      if (url.includes("?code")) {
        const code: string = url.split("?code=")[1];
  
        let requestData = {
          code: code,
          client_id: CLIENT_DATA.id,
          client_secret: CLIENT_DATA.secret,
        };
  
        fetch(
          `https://github.com/login/oauth/access_token?code=${code}&client_id=5ca6d8cb11bc7bfa2c3c&client_secret=1e18a58399d5723ce2e6165980142795c9f0884a`,
          {
            method: "post",
            headers: { Accept: "application/json" },
            body: JSON.stringify(requestData),
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