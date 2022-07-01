// lib
import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";

// utils
import { callToApi } from "../../utils/GenericFunctions";

const useCreateGist = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarTextOpen] = useState("");

  let location: any = useLocation();
  let navigate = useNavigate();

  const [fileName, setFileName] = useState(
    location?.state
      ? location?.state?.files[Object.keys(location?.state?.files)[0]]?.filename
      : ""
  );
  const [gistDesc, setGistDesc] = useState(
    location.state ? location?.state?.description : ""
  );
  const [gistContent, setGistContent] = useState(
    location.state ? location?.state.fileContent : ""
  );
  const auth = useContext(userContext);

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGistDesc(e.target.value);
  };
  const handleChangeFileName = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFileName(e.target.value);
  };
  const handleChangeContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setGistContent(e.target.value);
  };

  const hideSnackBar = () => {
    setSnackBarOpen(false);
    navigate("/your-gists");
  };

  const createGist = async () => {
    let requestData: any = {
      description: gistDesc,
      public: true,
      files: {},
    };

    requestData.files[fileName] = {
      content: gistContent,
    };
    try {
      const response = await callToApi("https://api.github.com/gists", {
        method: "POST",
        headers: {
          Authorization: `token ${auth?.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response) {
        setSnackBarTextOpen("New Gist Created Successfully!");
        setSnackBarOpen(true);
        setTimeout(() => {
          //autoHideDuration attr was not working
          hideSnackBar();
        }, 3000);
      }
    } catch (err) {
      console.log("API ERROR", err);
    }
  };

  const updateGist = async (id: string) => {
    let requestData: any = {
      description: gistDesc,
      public: true,
      files: {},
    };
    requestData.files[fileName] = {
      content: gistContent,
    };

    try {
      await callToApi(`https://api.github.com/gists/${id}`, {
        method: "POST",
        headers: {
          Authorization: `token ${auth?.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });
      navigate("/your-gists");
    } catch (err) {
      console.log("API ERROR", err);
    }
  };

  return {
    fileName,
    gistDesc,
    gistContent,
    handleChangeDesc,
    handleChangeFileName,
    handleChangeContent,
    createGist,
    updateGist,
    location,
    snackBarOpen,
    snackBarText,
  };
};
export default useCreateGist;
