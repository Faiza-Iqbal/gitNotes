// lib
import { useState } from "react";
import { Snackbar } from "@mui/material";

// src
import useProfilePage from "./useProfilePage";
import Header from "../../components/common/Header/Header";
import { ContainerStyled } from "../../styles/Container.style";
import SubmitButton from "../../components/common/SubmitButton/SubmitButton";

// style
import "./ProfilePage.css";

const ProfilePage = () => {
  const [searchState, setSearchState] = useState("");
  const {
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
  } = useProfilePage();

  const editSearchState = (e: any) => {
    setSearchState(e.target.value);
  };

  return (
    <>
      <Snackbar open={snackBarOpen} message={snackBarText} />
      <Header editSearchState={editSearchState} searchState={searchState} />
      <ContainerStyled>
        <form className="outerWrapper pd-50">
          <input
            type="text"
            value={gistDesc}
            onChange={handleChangeDesc}
            placeholder="Enter gist description..."
          />
          <input
            type="text"
            value={fileName}
            onChange={handleChangeFileName}
            placeholder="Enter File Name..."
          />
          {
            <textarea
              rows={20}
              value={gistContent}
              onChange={handleChangeContent}
              placeholder="Enter file content..."
            />
          }
        </form>
        <div className="outerWrapper pd-50">
          <SubmitButton
            handleSubmit={
              location.state ? () => updateGist(location.state?.id) : createGist
            }
            label={location.state ? "Update" : "Create"}
          />
        </div>
      </ContainerStyled>
    </>
  );
};
export default ProfilePage;
