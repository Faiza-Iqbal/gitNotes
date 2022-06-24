// lib
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveGist = ({ apiItem, removeAGist }: any) => {
  return (
    <span className="spanWrap" onClick={() => removeAGist(apiItem.id)}>
      <DeleteIcon className="blueIcon" />
      Remove
    </span>
  );
};
export default RemoveGist;
