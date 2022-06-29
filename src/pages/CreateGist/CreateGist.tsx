// lib
import { useState } from "react";
import { Snackbar } from "@mui/material";

// src
import useCreateGist from "./useCreateGist";
import Header from "../../components/common/Header/Header";
import { ContainerStyled } from "../../styles/styled_components";
import SubmitButton from "../../components/common/SubmitButton/SubmitButton";

// style
import "./CreateGist.scss";

const CreateGist = () => {
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
  } = useCreateGist();

  const editSearchState = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
              onChange={(e) => handleChangeContent(e)}
              placeholder="Enter file content..."
            />
          }
        </form>
        <div className="outerWrapper pd-50">
          <SubmitButton
            handleSubmit={
              location.state?.id
                ? () => updateGist(location.state?.id)
                : createGist
            }
            label={location.state ? "Update" : "Create"}
          />
        </div>
      </ContainerStyled>
    </>
  );
};
export default CreateGist;
