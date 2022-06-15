import SearchInput from "./SearchInput";
import FontAwesome from "../../Fontawesome/Fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchBar: React.FC = () => {
  return (
    <>
      <SearchInput placeholder="Search Notes..." />
      <FontAwesome faIcon={faSearch} />
    </>
  );
};
export default SearchBar;
