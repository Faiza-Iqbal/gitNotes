// lib
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// src
import userContext from "../../context/userContext";

const useGistPage = () => {
  const { id } = useParams();
  const [gistData, setGistData] = useState<any>({});
  const [loader, setLoader] = useState(true);
  const [searchState, setSearchState] = useState("");
  const [isStarred, setIsStarred] = useState(0);
  const auth = useContext(userContext);

  useEffect(() => {
    
    (async () => {

      try {
        const response = await axios.get(`https://api.github.com/gists/${id}`);
        setGistData(response.data);
        setLoader(false);
      } 
      catch (err) {
        console.log("API ERROR", err);
      }
    })();
    (async () => {

      try{
        const response = await axios.get(`https://api.github.com/gists/${id}/star`, {
          headers: { Authorization: `token ${auth?.accessToken}` },
        });
    
        if (response.status === 204) setIsStarred(1);
      }
      catch(err){
        console.log("API ERROR",err);
      }
    })();

  }, [auth?.accessToken, id]);

  const editSearchState = (e: React.ChangeEvent<HTMLInputElement>) :void => {
    setSearchState(e.target.value);
  };
  return {
    id,
    gistData,
    loader,
    searchState,
    isStarred,
    auth,
    editSearchState,
  };
};
export default useGistPage;
