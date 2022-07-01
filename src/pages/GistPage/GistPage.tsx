// lib
import { experimentalStyled as styled } from "@mui/material/styles";
import { Avatar, Typography, Paper, Grid } from "@mui/material";

// src
import Header from "../../components/common/Header/Header";
import { Section } from "../../styles/styled_components";
import Loader from "../../components/common/Loader/Loader";
import ViewFileContent from "../../components/common/ViewFileContent/ViewFileContent";
import StarWithCount from "../../components/common/Star/Star";
import ForkWithCount from "../../components/common/Fork/Fork";
import useGistPage from "./useGistPage";

// utils
import { showDateInDays } from "../../utils/GenericFunctions";

// style
import "./GistPage.scss";
import { royalblue } from "../../styles/colorVariables";

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
              <Grid item xs={2} lg={0.5}>
                <Avatar src={gistData?.owner?.avatar_url} alt="User Profile" />
              </Grid>
              <Grid item xs={10} lg={9.5}>
                <Typography color="blue">{gistData?.owner?.login}</Typography>
                <Typography style={{ color: "gray", fontSize: "14px" }}>
                  Created {showDateInDays(gistData?.created_at)}{" "}
                </Typography>
                <Typography style={{ color: "gray", fontSize: "10px" }}>
                  Broadcast Server
                </Typography>
              </Grid>
              <Grid item xs={12} lg={2}>
                <span className="spanWrap">
                  <StarWithCount id={gistData?.id} count={isStarred} />
                  <span className="spanWrap">Star</span>
                  <ForkWithCount
                    enable={
                      gistData?.owner?.login === auth?.user?.login
                        ? false
                        : true
                    }
                    id={gistData?.id}
                    count={0}
                    css={royalblue}
                  />
                  <span className="spanWrap">Fork</span>
                </span>
              </Grid>
            </Grid>
            <Item>
              <Grid>
                <div className="gistContentWrapper">
                  <Typography>
                    {gistData?.files[Object.keys(gistData?.files)[0]]?.filename}
                  </Typography>
                  <hr />
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default GistPage;
