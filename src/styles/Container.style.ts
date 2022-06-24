import styled from "@emotion/styled";

export const ContainerStyled = styled.div({
  maxWidth: "1300px",
  width: "100%",
  margin: "0 auto",
  "@media (max-width:1440px)": {
    maxWidth: "990px"
  },
  "@media (max-width:1024px)": {
    maxWidth: "767px"
  },
  "@media (max-width:768px) ": {
    padding: "0",
    maxWidth: "430px"
  },
  "@media (max-width:425px)" : {
    maxWidth: "320px"
  }
})
