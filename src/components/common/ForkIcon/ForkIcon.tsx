// lib
import { useContext, useState } from "react";
import { Snackbar } from "@mui/material";

// src
import userContext from "../../../context/userContext";

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

// utils
import { forkGist } from "../../../utils/GenericFunctions/GenericFunctions";

const ForkIcon = ({ id, count }: any) => {
  const [forkCount, setForkCount] = useState(count);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const auth = useContext(userContext);

  const hideSnackBar = () => setSnackBarOpen(false);

  const forkAGist = async (id: string) => {
    if (forkCount > 0) return;
    if (auth?.user) {
      let response = await forkGist(id);
      if (response) setForkCount(forkCount + 1);
      setSnackBarText("This gist has been Successfully forked");
      setSnackBarOpen(true);
    } else {
      setSnackBarText("You need to login to fork a gist");
      setSnackBarOpen(true);
    }
    setTimeout(() => {
      //autoHideDuration attr was not working
      hideSnackBar();
    }, 3000);
  };

  return (
    <>
      <Snackbar open={snackBarOpen} message={snackBarText} />
      <FontAwesomeIcon
        onClick={() => forkAGist(id)}
        className={forkCount ? "forked" : "styledIcon"}
        icon={faCodeFork}
      />
    </>
  );
};

export default ForkIcon;
