import { SearchInputStyled } from "../../../styles/SearchInput.style";
const SearchInput = ({ placeholder, onkeyup }) => {
  return (
    <SearchInputStyled
      onkeyup={onkeyup}
      type="search"
      placeholder={placeholder}
    ></SearchInputStyled>
  );
};
export default SearchInput;
