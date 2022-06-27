// lib
import DeleteIcon from "@mui/icons-material/Delete";

type RemoveGistProps = {
  apiItem: any;
  removeAGist: any;
};
const RemoveGist = ({ apiItem, removeAGist }: RemoveGistProps) => {
  return (
    <span className="spanWrap" onClick={() => removeAGist(apiItem.id)}>
      <DeleteIcon className="blueIcon" />
      Remove
    </span>
  );
};
export default RemoveGist;
