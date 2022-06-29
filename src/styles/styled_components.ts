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
});

export const FlexEnd = styled.div({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  });

  export const HeaderContainer = styled.section({
    backgroundColor: "#5acba1",
    boxShadow: "0px 5px 5px 0px #f0f0f0"
  });
  
  export const IconButton = styled.button({
    background: "transparent",
    border: "none",
    padding: "0"
  });

  export const ListItemStyled = styled.li({
    position: "relative",
  });

  export const Logo = styled.a({
    color: "#fff",
    textDecoration: "none",
    letterSpacing: "4px",
    fontSize: "30px",
    fontWeight: "600",
    "@media (max-width:768px)": {
      letterSpacing: "3px",
      fontSize: "16px",
    },
  });

  export const ListStyled = styled.ul({
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  });

  export const NavStyled = styled.nav({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  export const Section = styled.section({
    padding: "25px 15px",
    overflowX: "auto",
  });



  
