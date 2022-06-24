import styled from "@emotion/styled";

export const ButtonStyled = styled.button({
  border: "none",
  backgroundColor: "#fff",
  padding: "10px",
  color: "#5acba1",
  borderRadius: "3px",
  marginLeft: "20px",
  minWidth:"100px",
  fontWeight: "600",
  cursor: "pointer",
  "@media (max-width: 768px)" : {
    minWidth: "auto",
  }
})
