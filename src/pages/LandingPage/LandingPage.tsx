// lib
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// src
import Header from "../../components/common/Header/Header";
import { ContainerStyled } from "../../styles/Container.style";
import { Section } from "../../styles/Section.style";
import { FlexEnd } from "../../styles/FlexEnd.style";
import { IconButton } from "../../styles/IconButton.style";
import ListLayout from "../../components/common/ListLayout/ListLayout";
import GridLayout from "../../components/common/GridLayout/GridLayout";
import Loader from "../../components/common/Loader/Loader";
import useLandingPage from "./useLandingPage";

// style
import "../../styles.css";
import "./LandingPage.css";

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
            {!showGrid && !loader && <ListLayout apiData={tableData} />}
            {showGrid && !loader && <GridLayout apiData={tableData} />}
          </Section>
        </ContainerStyled>
      </Section>
    </>
  );
};
export default LandingPage;
