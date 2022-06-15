import styled from "styled-components";
import { device } from "../../../devices";
export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  flex-wrap: wrap;
  @media ${device.laptop} {
    justify-content: center;
  }
`;
