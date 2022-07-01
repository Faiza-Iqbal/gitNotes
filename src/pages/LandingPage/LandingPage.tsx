// lib
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// src
import Header from "../../components/common/Header/Header";
import { Section } from "../../styles/styled_components";
import { FlexEnd } from "../../styles/styled_components";
import { IconButton } from "../../styles/styled_components";
import ListLayout from "../../components/common/ListLayout/ListLayout";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Loader from "../../components/common/Loader/Loader";
import useLandingPage from "./useLandingPage";

// style
import { seaGreen, defaultGray } from "../../styles/colorVariables";
import { Container } from "@mui/material";

const LandingPage: React.FC = () => {
  const {
    tableData,
    showGrid,
    setShowGrid,
    searchState,
    loader,
    editSearchState,
  } = useLandingPage();

  return (
    <>
      <Header editSearchState={editSearchState} searchState={searchState} />
      <Section>
        <Container>
          <FlexEnd>
            <IconButton onClick={() => setShowGrid(true)}>
              <GridViewIcon style={showGrid ? ActiveIcon : IconStyled} />
            </IconButton>
            <IconButton onClick={() => setShowGrid(false)}>
              <FormatListBulletedIcon
                style={!showGrid ? ActiveIcon : IconStyled}
              />
            </IconButton>
          </FlexEnd>
          <Section>
            {loader && <Loader />}
            {!showGrid && !loader && <ListLayout apiData={tableData} />}
            {showGrid && !loader && <GridLayout apiData={tableData} />}
          </Section>
        </Container>
      </Section>
    </>
  );
};

const IconStyled = {
  width: 40,
  height: 30,
  color: defaultGray,
};
const ActiveIcon = {
  width: 40,
  height: 30,
  color: seaGreen,
};
export default LandingPage;
