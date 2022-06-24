// lib
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";

// utils
import { callToApi } from "../../utils/GenericFunctions/CallToApi";

const useProfilePage = () =>{
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
    alert("New Gist Created successfully!");
    navigate('/your-gists');
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
    location
  };
}
export default useProfilePage;
