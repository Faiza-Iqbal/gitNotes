// lib
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

// src
import Gists from "../../components/common/Gists/Gists";
import userContext from "../../context/userContext";

// utils
import { deleteUser } from "../../utils/GenericFunctions/GenericFunctions";

const YourGists = () => {
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

  return (
    <>
      <Snackbar open={snackBarOpen} message="Bad Credentials" />
      <Gists isStarred={0} apiData={gists} />;
    </>
  );
};
export default YourGists;
