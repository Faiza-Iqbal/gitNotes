import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
interface Props{
  faIcon: IconProp;
}
const FontAwesome: React.FC<Props> = ({ faIcon }) => {
  return <FontAwesomeIcon icon={faIcon}></FontAwesomeIcon>;
};
export default FontAwesome;
