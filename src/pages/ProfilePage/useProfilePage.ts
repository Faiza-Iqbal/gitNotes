// lib
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";


// utils
import { callToApi } from "../../utils/GenericFunctions/CallToApi";

const useProfilePage = () =>{
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarTextOpen] = useState("");

  let location: any = useLocation();
  let navigate = useNavigate();

  const [fileName , setFileName] = useState(location.state ?
    location?.state?.files[Object.keys(location?.state?.files)[0]]
        ?.filename : "");
  const [gistDesc, setGistDesc] = useState(location.state ?
    location?.state?.description : "");
  const [gistContent, setGistContent] = useState(location.state ? location?.state.fileContent : "");

  let accessToken = localStorage.getItem("accessToken");

  const handleChangeDesc = (e: any) => {
    setGistDesc(e.target.value);
  };
  const handleChangeFileName = (e: any) => {
    setFileName(e.target.value);
  };
  const handleChangeContent = (e: any) => {
    setGistContent(e.target.value);
  };

  const hideSnackBar = () => {
    setSnackBarOpen(false);
    navigate('/your-gists');
  }

  const createGist = async () => {

    let requestData: any = {
      description: gistDesc,
      public: true,
      files: {},
    };
    requestData.files[fileName] = {
      content: gistContent,
    };
    await callToApi("https://api.github.com/gists", {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
      },
      body: JSON.stringify(requestData),
    });
      setSnackBarTextOpen("New Gist Created Successfully!");
      setSnackBarOpen(true);
      setTimeout(() => {
        //autoHideDuration attr was not working
        hideSnackBar();
      }, 3000);
    

  };

  const updateGist =async (id:string) => {
    let requestData: any = {
        description: gistDesc,
        public: true,
        files: {},
      };
      requestData.files[fileName] = {
        content: gistContent,
      };
    await callToApi(`https://api.github.com/gists/${id}`, {
        method: "POST",
        headers: {
          Authorization: `token ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });
    alert("Gist updated successfully");
    navigate('/your-gists');
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
    snackBarText

  };
}
export default useProfilePage;
