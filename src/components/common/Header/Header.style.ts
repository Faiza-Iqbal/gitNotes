import styled from "@emotion/styled";

export const HeaderStyled = styled.header({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 10px",
  flexWrap: "wrap",
  "@media(max-width:1024px)": {
    justifyContent: "center",
  },
});
