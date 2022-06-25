// lib
import { useContext, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Snackbar } from "@mui/material";

// src
import userContext from "../../../context/userContext";

// utils
import { starGist } from "../../../utils/GenericFunctions/GenericFunctions";

type StarIconComponentProp = {
  id: string;
  count: number;
};

const StarIconComponent = ({ id, count }: StarIconComponentProp) => {
  const [starCount, setStarCount] = useState(count);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarTextOpen] = useState("");
  const auth = useContext(userContext);

  const hideSnackBar = () => setSnackBarOpen(false);

  const starAGist = async (id: string) => {
    if (starCount > 0) return;
    if (auth?.user) {
      let response = await starGist(id);
      if (response) setStarCount(starCount + 1);
      setSnackBarTextOpen("This gist has been Starred");
      setSnackBarOpen(true);
    } else {
      setSnackBarTextOpen("You need to login to star a gist");
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
      {starCount === 0 && (
        <StarBorderIcon onClick={() => starAGist(id)} className="greenIcon" />
      )}
      {starCount > 0 && <StarIcon className="greenIcon" />}
    </>
  );
};
export default StarIconComponent;
