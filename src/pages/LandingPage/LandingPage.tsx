import Header from "../../components/common/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import { ContainerStyled } from "../../styles/Container.style";
import { Section } from "../../styles/Section.style";
import { FlexEnd } from "../../styles/FlexEnd.style";
import { IconButton } from "../../styles/IconButton.style";
import useFetch from "../../hooks/fetch";
import "../../styles.css";
import "./LandingPage.css";
import TableComponent from "../../components/common/Table/Table";
const LandingPage: React.FC = () => {
  const apiData = useFetch('https://api.github.com/gists');
  console.log("apiData",apiData);

  return (
    <>
      <Header />
      <Section>
        <ContainerStyled>
          <FlexEnd>
            <IconButton>
              <FontAwesomeIcon
                className="gridIcon"
                icon={faBorderAll}
              ></FontAwesomeIcon>
            </IconButton>
            <IconButton>
              <FontAwesomeIcon
                className="listIcon"
                icon={faList}
              ></FontAwesomeIcon>
            </IconButton>
          </FlexEnd>
          <Section>
            <TableComponent apiData ={apiData} />
          </Section>
        </ContainerStyled>
      </Section>
    </>
  );
};
export default LandingPage;
