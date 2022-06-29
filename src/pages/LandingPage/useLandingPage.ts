// lib
import { useEffect, useState } from "react";
import axios from "axios";

import { CLIENT_DATA } from "../../constants/clientData";

const useLandingPage = () => {
  const [tableData, setTableData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://api.github.com/gists?per_page=50");
        setTableData(response?.data);
        setApiData(response?.data);
        setLoader(false);
      } 
      catch (err) {
        console.log("API ERROR", err);
      }
    })();

    const url = window.location.href;

    const loginWithGitHub = async () => {
      const code: string = url.split("?code=")[1];
      try {
        const response = await axios(
          `https://github.com/login/oauth/access_token?code=${code}&client_id=${CLIENT_DATA.id}&client_secret=${CLIENT_DATA.secret}`,
          {
            method: "post",
            headers: { Accept: "application/json" },
          }
        );
        const accessToken = response.data.access_token;
        if(accessToken)
        localStorage.setItem("accessToken", accessToken);

        const userResponse = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });

        if (userResponse && userResponse.data.login) {
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          window.location.href = url.split("?")[0];
        }
      } 
      catch (err) {
        console.log("API ERROR", err);
      }
    };

    if (url.includes("?code")) {
      loginWithGitHub();
    }
  }, []);

  const editSearchState = (e: React.ChangeEvent<HTMLInputElement>) :void => {
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
    editSearchState,
  };
};
export default useLandingPage;
