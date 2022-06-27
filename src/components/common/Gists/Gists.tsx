// lib
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";

// src
import Header from "../Header/Header";
import { Section } from "../../../styles/Section.style";
import ViewFileContent from "../ViewFileContent/ViewFileContent";
import StarWithCount from "../StarWithCount/StarWithCount";
import ForkWithCount from "../ForkWithCount/ForkWithCount";
import EditGist from "../EditGist/EditGist";
import RemoveGist from "../RemoveGist/RemoveGist";
import userContext from "../../../context/userContext";

// utils
import {
  goToRoute,
  removeGist,
  showDateInDays,
} from "../../../utils/GenericFunctions/GenericFunctions";

// style
import "./Gists.css";

// Material styled Item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: 200,
}));

type GistsProps = {
  apiData: any;
  isStarred: number;
};
const Gists = ({ apiData, isStarred }: GistsProps) => {
  const [searchState, setSearchState] = useState("");
  const [apiDataState, setApiDataState] = useState(apiData);
  const navigate = useNavigate();
  const auth = useContext(userContext);

  useEffect(() => {
    setApiDataState(apiData);
  }, [apiData]);

  const removeAGist = async (id: string) => {
    let response = await removeGist(id);
    if (response) {
      const filteredGists = apiDataState.filter((apiItem: any) => {
        if (apiItem?.id !== id) return true;
      });
      setApiDataState(filteredGists);
      return response;
    }
  };
  const editSearchState = (e: any) => {
    setSearchState(e.target.value);
  };

  return (
    <>
      <Header editSearchState={editSearchState} searchState={searchState} />
      <Section>
        <div className="innerWrapper">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      src={auth?.user?.avatar_url}
                      alt={auth?.user?.login}
                      style={{
                        width: "250px",
                        height: "250px",
                        marginBottom: "30px",
                      }}
                    />
                    <Typography
                      style={{
                        color: "black",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      {auth?.user?.login}
                    </Typography>
                    <a
                      className="blueAnchor"
                      target="_blank"
                      rel="noreferrer"
                      href={auth?.user.html_url}
                    >
                      View GitHub Profile{" "}
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} sm={8} md={8}>
                {apiDataState.map((apiItem: any, index: number) => (
                  <div key={`${apiItem?.id}`} className="pd-btm50">
                    <Grid container alignItems="center" className="pd-btm50">
                      <Grid item lg={1}>
                        <Avatar
                          src={apiItem?.owner?.avatar_url}
                          alt={apiItem?.owner?.login}
                        />
                      </Grid>
                      <Grid item lg={6}>
                        <Typography color="blue">
                          {apiItem?.owner?.login}
                        </Typography>
                        <Typography style={{ color: "gray", fontSize: "14px" }}>
                          Created {showDateInDays(apiItem?.created_at)}{" "}
                        </Typography>
                        <p style={{ color: "gray", fontSize: "10px" }}>
                          Broadcast Server{" "}
                        </p>
                      </Grid>
                      <Grid item lg={5}>
                        {apiItem?.owner?.login === auth?.user?.login && (
                          <>
                            <EditGist apiItem={apiItem} />
                            <RemoveGist
                              removeAGist={removeAGist}
                              apiItem={apiItem}
                            />
                          </>
                        )}
                        <StarWithCount
                          id={apiItem?.id}
                          count={isStarred ? 1 : 0}
                        />
                        <ForkWithCount
                          enable={
                            apiItem?.owner?.login === auth?.user?.login
                              ? false
                              : true
                          }
                          id={apiItem?.id}
                          count={0}
                        />
                      </Grid>
                    </Grid>
                    <Item
                      onClick={() => navigate(goToRoute("/gist", apiItem?.id))}
                    >
                      <Grid container alignItems="center">
                        {apiData.length === 0 && (
                          <h3>You Have No starred Gists Yet</h3>
                        )}
                        {apiData.length > 0 && (
                          <ViewFileContent
                            file={
                              apiData[index]?.files[
                                Object.keys(apiData[index]?.files)[0]
                              ]?.raw_url
                            }
                          />
                        )}
                      </Grid>
                    </Item>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Box>
        </div>
      </Section>
    </>
  );
};
export default Gists;
