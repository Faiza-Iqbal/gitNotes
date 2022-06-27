// lib
import { useContext, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Snackbar } from "@mui/material";

// src
import userContext from "../../../context/userContext";

// utils
import { starGist } from "../../../utils/GenericFunctions";

type StarWithCountProps = {
  id: string;
  count: number;
};

const StarWithCount = ({ id, count }: StarWithCountProps) => {
  const [starCount, setStarCount] = useState(count);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const auth = useContext(userContext);

  const hideSnackBar = () => setSnackBarOpen(false);

  const starAGist = async (id: string) => {
    if (starCount > 0) return;

    if (auth?.user) {
      let response = await starGist(id);

      if (response) setStarCount(starCount + 1);
      setSnackBarText("This gist has been Starred! ");
      setSnackBarOpen(true);
    } else {
      setSnackBarText("You need to login to star a gist");
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
      <span onClick={() => starAGist(id)} className="spanWrap">
        {starCount === 0 && <StarBorderIcon className="blueIcon" />}
        {starCount > 0 && <StarIcon className="blueIcon" />}
        <span>Star</span>
        {/* <span className="counter">{starCount}</span> */}
      </span>
    </>
  );
};

export default StarWithCount;
