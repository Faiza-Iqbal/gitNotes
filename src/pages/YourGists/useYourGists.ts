// lib
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// src
import userContext from "../../context/userContext";

// utils
import { deleteUser } from "../../utils/GenericFunctions";

const useYourGists = () =>{
    const auth = useContext(userContext);
    const [gists, setGists] = useState([]);
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
  
    const hideSnackBar = () => setSnackBarOpen(false);
  
    const getGists = async () => {

      try{
        const res = await axios.get("https://api.github.com/gists", {
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
        if (res.data) setGists(res.data);
      }
      
      catch(err){
        console.log("API ERROR", typeof(err));
        setSnackBarOpen(true);
        setTimeout(() => {
          //autoHideDuration attr was not working
          hideSnackBar();
          navigate("/");
        }, 3000);
        return;
      }
    };
  
    useEffect(() => {
      getGists();
    },[]);

 return{
    gists,
    snackBarOpen  
 }

}
export default useYourGists;