import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { deleteUser } from "../../utils/GenericFunctions";

const useYourGists = () =>{
    const auth = useContext(userContext);
    const [gists, setGists] = useState([]);
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
  
    const hideSnackBar = () => setSnackBarOpen(false);
  
    const getGists = async () => {
      const res = await fetch("https://api.github.com/gists", {
        headers: {
          Authorization: `token ${auth?.accessToken}`,
        },
      });
      if (res.status === 401) {
        setSnackBarOpen(true);
        setTimeout(() => {
          //autoHideDuration attr was not working
          hideSnackBar();
          deleteUser();
          navigate("/");
        }, 3000);
        return;
      }
      const data = await res.json();
      if (data) setGists(data);
    };
  
    useEffect(() => {
      getGists();
    }, []);

 return{
    gists,
    snackBarOpen  
 }

}
export default useYourGists;