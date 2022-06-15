import styled from "styled-components";
import { device } from "../devices";
export const ContainerStyled = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  @media ${device.laptopL} {
    max-width: 990px;
  }
  @media ${device.laptop} {
    max-width: 767px;
  }
  @media ${device.tablet} {
    padding: 0;
    max-width: 430px;
  }
  @media ${device.mobileL} {
    max-width: 320px;
  }
`;
