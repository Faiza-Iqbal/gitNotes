import styled from "@emotion/styled";
import { device } from "./devices";

export const FlexEnd = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

export const HeaderContainer = styled.section({
  backgroundColor: "#5acba1",
  boxShadow: "0px 5px 5px 0px #f0f0f0",
});

export const IconButton = styled.button({
  background: "transparent",
  border: "none",
  padding: "0",
});

export const ListItemStyled = styled.li({
  position: "relative",
});

export const Logo = styled.a`
  color: #fff;
  text-decoration: none;
  letter-spacing: 4px;
  font-size: 30px;
  font-weight: 600;
  @media ${device.tablet} {
    letter-spacing: 3px;
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

export const ListStyled = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  @media ${device.tablet} {
    margin: 0;
  }
`;

export const NavStyled = styled.nav({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Section = styled.section({
  padding: "25px 15px",
  overflowX: "auto",
});
