import SearchInput from "./SearchInput";
import FontAwesome from "../../Fontawesome/Fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
type searchedGistResult = {
  searchGist :any;
}
const SearchBar = ({searchGist}:searchedGistResult) => {
  return (
    <>
      <SearchInput onkeyup = {searchGist} placeholder="Search Notes..." />
      <FontAwesome faIcon={faSearch} />
    </>
  );
};
export default SearchBar;
