// lib
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Avatar, Typography, Box, Paper, Grid, Link } from "@mui/material";

// src
import Header from "../Header/Header";
import { Section } from "../../../styles/styled_components";
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
} from "../../../utils/GenericFunctions";

// style
import "./Gists.scss";

type GistsProps = {
  apiData: any;
  isStarred?: boolean;
};

const Gists = ({ apiData, isStarred = false }: GistsProps) => {
  const [searchState, setSearchState] = useState("");
  const [apiDataState, setApiDataState] = useState<any>();
  const navigate = useNavigate();
  const auth = useContext(userContext);

  useEffect(() => {
    setApiDataState(apiData);
  }, [apiData]);

  const removeAGist = async (id: string) => {
    let response = await removeGist(id);

    if (response) {
      const filteredGists = apiDataState?.filter((apiItem: any) => {
        if (apiItem?.id !== id) return true;
        else return false;
      });

      setApiDataState(filteredGists);
      return response;
    }
  };

  const editSearchState = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchState(e.target.value);
  };

  return (
    <>
      <Header editSearchState={editSearchState} searchState={searchState} />
      <Section>
        <div className="innerWrapper">
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={4}
                justifyContent="center"
              >
                <Grid item sx={{ marginBottom: "50px" }}>
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
                  <Link
                    className="blueAnchor"
                    target="_blank"
                    rel="noreferrer"
                    href={auth?.user.html_url}
                  >
                    View GitHub Profile
                  </Link>
                </Grid>
              </Grid>
              <Grid item sm={8} md={8}>
                {apiDataState?.map((apiItem: any, index: number) => (
                  <div key={`${apiItem?.id}`} className="pd-btm50">
                    <Grid container alignItems="center" className="pd-btm50">
                      <Grid item sm={1} md={1} lg={1}>
                        <Avatar
                          src={apiItem?.owner?.avatar_url}
                          alt={apiItem?.owner?.login}
                        />
                      </Grid>
                      <Grid item sm={6} md={5} lg={6}>
                        <Typography color="blue">
                          {apiItem?.owner?.login}
                        </Typography>
                        <Typography style={{ color: "gray", fontSize: "14px" }}>
                          Created {showDateInDays(apiItem?.created_at)}
                        </Typography>
                        <p style={{ color: "gray", fontSize: "10px" }}>
                          Broadcast Server
                        </p>
                      </Grid>
                      <Grid item sm={5} md={6} lg={5}>
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
                          enable={apiItem?.owner?.login !== auth?.user?.login}
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  height: 200,
}));

export default Gists;
