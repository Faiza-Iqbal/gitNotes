// lib
import { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// src
import Header from "../../components/common/Header/Header";
import { ContainerStyled } from "../../styles/Container.style";
import { Section } from "../../styles/Section.style";
import { FlexEnd } from "../../styles/FlexEnd.style";
import { IconButton } from "../../styles/IconButton.style";
import TableComponent from "../../components/common/Table/Table";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Loader from "../../components/common/Loader/Loader";

// data
import { CLIENT_DATA } from "../../data/clientData";

// style
import "../../styles.css";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/gists?per_page=50")
      .then((response) => response.json())
      .then((resp) => {
        setTableData(resp);
        setApiData(resp);
        setLoader(false);
      });

    const url = window.location.href;

    if (url.includes("?code")) {
      const code: string = url.split("?code=")[1];

      let requestData = {
        code: code,
        client_id: CLIENT_DATA.id,
        client_secret: CLIENT_DATA.secret,
      };

      fetch(
        `https://github.com/login/oauth/access_token?code=${code}&client_id=5ca6d8cb11bc7bfa2c3c&client_secret=1e18a58399d5723ce2e6165980142795c9f0884a`,
        {
          method: "post",
          headers: { Accept: "application/json" },
          body: JSON.stringify(requestData),
        }
      )
        .then((response) => response.json())
        .then((resp) => {
          const accessToken = resp.access_token;
          localStorage.setItem("accessToken", accessToken);

          fetch("https://api.github.com/user", {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          })
            .then((response) => response.json())
            .then((resp) => {
              if (resp && resp.login) {
                localStorage.setItem("user", JSON.stringify(resp));
                window.location.href = url.split("?")[0];
              }
            });
        });
    }
  }, []);

  const editSearchState = (e: any) => {
    setSearchState(e.target.value);
    setTableData(
      apiData.filter((apiItem: any) => apiItem.id.includes(e.target.value))
    );
  };

  return (
    <>
      <Header editSearchState={editSearchState} searchState={searchState} />
      <Section>
        <ContainerStyled>
          <FlexEnd>
            <IconButton className="gridIcon" onClick={() => setShowGrid(true)}>
              <GridViewIcon
                className={showGrid ? "greenActive gridIcon" : "gridIcon"}
              />
            </IconButton>
            <IconButton onClick={() => setShowGrid(false)}>
              <FormatListBulletedIcon
                className={!showGrid ? "greenActive listIcon" : "listIcon"}
              />
            </IconButton>
          </FlexEnd>
          <Section>
            {loader && <Loader />}
            {!showGrid && !loader && <TableComponent apiData={tableData} />}
            {showGrid && !loader && <GridLayout apiData={tableData} />}
          </Section>
        </ContainerStyled>
      </Section>
    </>
  );
};
export default LandingPage;
