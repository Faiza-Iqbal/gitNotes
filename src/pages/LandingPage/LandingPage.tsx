// lib
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

// style
import "../../styles.css";
import "./LandingPage.css";
import useLandingPage from "./useLandingPage";

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
            {!showGrid && !loader && <TableComponent apiData={tableData} />}
            {showGrid && !loader && <GridLayout apiData={tableData} />}
          </Section>
        </ContainerStyled>
      </Section>
    </>
  );
};
export default LandingPage;
