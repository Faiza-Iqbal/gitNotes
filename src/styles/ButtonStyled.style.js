import styled from "styled-components";
import { device } from "../devices";
export const ButtonStyled = styled.button`
  border: none;
  background-color: #fff;
  padding: 10px;
  color: #5acba1;
  border-radius: 3px;
  margin-left: 20px;
  min-width: 100px;
  font-weight: 600;
  cursor: pointer;
  @media ${device.tablet} {
    min-width: auto;
  }
`;
