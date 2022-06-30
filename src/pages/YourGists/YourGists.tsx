// lib
import { Snackbar } from "@mui/material";

// src
import Gists from "../../components/common/Gists/Gists";
import useYourGists from "./useYourGists";

const YourGists = () => {
  const { gists, snackBarOpen } = useYourGists();

  return (
    <>
      <Snackbar open={snackBarOpen} message="Bad Credentials" />
      <Gists apiData={gists} />;
    </>
  );
};
export default YourGists;
