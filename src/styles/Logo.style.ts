import styled from "@emotion/styled";

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
