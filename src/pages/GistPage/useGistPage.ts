import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userContext from "../../context/userContext";

const useGistPage = () =>{
    const { id } = useParams();
    const [gistData, setGistData] = useState<any>([]);
    const [loader, setLoader] = useState(true);
    const [searchState, setSearchState] = useState("");
    const [isStarred, setIsStarred] = useState(0);
    const auth = useContext(userContext);
  
    useEffect(() => {
      fetch(`https://api.github.com/gists/${id}`)
        .then((response) => response.json())
        .then((result) => {
          setGistData([result]);
          setLoader(false);
        });
      fetch(`https://api.github.com/gists/${id}/star`, {
        headers: {
          Authorization: `token ${auth?.accessToken}`,
        },
      }).then((response) => {
        if (response.status === 204) {
          setIsStarred(1);
        }
      });
    }, []);
  
    const editSearchState = (e: any) => {
      setSearchState(e.target.value);
    };
    return{
        id,
        gistData,
        loader,
        searchState,
        isStarred,
        auth,
        editSearchState
    }
}
export default useGistPage;