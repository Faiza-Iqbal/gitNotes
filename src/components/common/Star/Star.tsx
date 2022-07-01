// lib
import { useContext, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Snackbar } from "@mui/material";

// src
import userContext from "../../../context/userContext";

// utils
import { starGist } from "../../../utils/GenericFunctions";
import { royalblue } from "../../../styles/colorVariables";

type StarProps = {
  id: string;
  count: number;
};

const Star = ({ id, count }: StarProps) => {
  const [starCount, setStarCount] = useState(count);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const auth = useContext(userContext);

  const hideSnackBar = () => setSnackBarOpen(false);

  const starAGist = async (id: string) => {
    if (starCount > 0) return;

    if (auth?.user?.login) {
      let response = await starGist(id);

      if (response) {
        setStarCount(starCount + 1);
        setSnackBarText("This gist has been Starred! ");
        setSnackBarOpen(true);
      }
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
        {starCount === 0 && <StarBorderIcon style={IconStyled} />}
        {starCount > 0 && <StarIcon style={IconStyled} />}
      </span>
    </>
  );
};
const IconStyled = {
  color: royalblue,
  width: 18,
  height: 16,
};

export default Star;
