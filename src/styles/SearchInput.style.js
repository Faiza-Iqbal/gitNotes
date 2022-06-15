import styled from "styled-components";
export const SearchInputStyled = styled.input`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 10px;
  min-width: 300px;
  opacity: 0.8;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #fff;
    font-size: 11px;
    font-weight: 400;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
