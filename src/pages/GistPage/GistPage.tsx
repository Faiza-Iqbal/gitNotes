// lib
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";

// src
import Header from "../../components/common/Header/Header";
import { Section } from "../../styles/Section.style";
import Loader from "../../components/common/Loader/Loader";
import ViewFileContent from "../../components/common/ViewFileContent/ViewFileContent";
import StarWithCount from "../../components/common/StarWithCount/StarWithCount";
import ForkWithCount from "../../components/common/ForkWithCount/ForkWithCount";
import useGistPage from "./useGistPage";

// utils
import { showDateInDays } from "../../utils/GenericFunctions/GenericFunctions";

// style
import "./GistPage.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const GistPage = () => {
  const { gistData, loader, searchState, isStarred, auth, editSearchState } =
    useGistPage();

  return (
    <>
      <Header editSearchState={editSearchState} searchState={searchState} />
      {loader && <Loader />}
      {!loader && (
        <Section>
          <div className="innerWrapper">
            <Grid container alignItems="center" className="pd-btm50">
              <Grid item lg={0.5}>
                <Avatar src={gistData?.owner?.avatar_url} alt="User Profile" />
              </Grid>
              <Grid item lg={9.5}>
                <Typography color="blue">{gistData?.owner?.login}</Typography>
                <Typography style={{ color: "gray", fontSize: "14px" }}>
                  Created {showDateInDays(gistData?.created_at)}{" "}
                </Typography>
                <p style={{ color: "gray", fontSize: "10px" }}>
                  Broadcast Server{" "}
                </p>
              </Grid>
              <Grid item lg={2}>
                <StarWithCount id={gistData?.id} count={isStarred} />
                <ForkWithCount
                  enable={
                    gistData?.owner?.login === auth?.user?.login ? false : true
                  }
                  id={gistData?.id}
                  count={0}
                />
              </Grid>
            </Grid>
            <Item>
              <Grid>
                <div className="gistContentWrapper">
                  <p>
                    {gistData?.files[Object.keys(gistData?.files)[0]]?.filename}
                  </p>
                  <hr></hr>
                  <ViewFileContent
                    file={
                      gistData?.files[Object.keys(gistData?.files)[0]]?.raw_url
                    }
                  />
                </div>
              </Grid>
            </Item>
          </div>
        </Section>
      )}
    </>
  );
};
export default GistPage;
