import styled from "@emotion/styled";
import { device } from "../../../styles/devices";

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  flex-wrap: wrap;
  @media ${device.tablet} {
    padding: 15px;
  }
  @media ${device.mobileL} {
    justify-content: center;
  }
`;
