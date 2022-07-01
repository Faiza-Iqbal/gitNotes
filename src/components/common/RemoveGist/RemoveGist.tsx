// lib
import DeleteIcon from "@mui/icons-material/Delete";
import { royalblue } from "../../../styles/colorVariables";

type RemoveGistProps = {
  apiItem: any;
  removeAGist: any;
};

const RemoveGist = ({ apiItem, removeAGist }: RemoveGistProps) => {
  return (
    <span className="spanWrap" onClick={() => removeAGist(apiItem?.id)}>
      <DeleteIcon style={IconStyled} />
      Remove
    </span>
  );
};
const IconStyled = {
  color: royalblue,
  width: 18,
  height: 16,
};
export default RemoveGist;
