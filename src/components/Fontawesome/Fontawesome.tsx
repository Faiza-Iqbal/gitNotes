// lib
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FontAwesomeProps {
  faIcon: IconProp;
}

const FontAwesome: React.FC<FontAwesomeProps> = ({ faIcon }) => {
  return <FontAwesomeIcon icon={faIcon} />;
};
export default FontAwesome;
