import styled from "styled-components";
import { device } from "../devices";
export const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  letter-spacing: 4px;
  font-size: 30px;
  font-weight: 600;
  @media ${device.tablet} {
    letter-spacing: 3px;
    font-size: 16px;
  }
`;
