// lib
import { useState } from "react";
import { Snackbar } from "@mui/material";

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

// utils
import { forkGist } from "../../../utils/GenericFunctions/GenericFunctions";

const ForkWithCount = ({ id, count, enable }: any) => {
  const [forkCount, setForkCount] = useState(count);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarTextOpen] = useState("");

  const user = localStorage.getItem("user");
  const hideSnackBar = () => setSnackBarOpen(false);

  const forkAGist = async (id: string) => {
    if (forkCount > 0) return;
    if (!enable) {
      setSnackBarTextOpen("You cannot fork your own gist!");
      setSnackBarOpen(true);
      setTimeout(() => {
        //autoHideDuration attr was not working
        hideSnackBar();
      }, 3000);
      return;
    }
    if (user) {
      let response = await forkGist(id);
      if (response) setForkCount(forkCount + 1);
      setSnackBarTextOpen("This gist has been Successfully forked");
      setSnackBarOpen(true);
    } else {
      setSnackBarTextOpen("You need to login to fork a gist");
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
      <span className="spanWrap">
        <FontAwesomeIcon className="blueIcon forkIcon" icon={faCodeFork} />
        <span onClick={() => forkAGist(id)}>Fork</span>
        {/* <span className="counter">{forkCount}</span> */}
      </span>
    </>
  );
};
export default ForkWithCount;
