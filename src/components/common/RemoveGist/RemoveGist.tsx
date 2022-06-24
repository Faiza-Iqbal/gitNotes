// lib
import DeleteIcon from "@mui/icons-material/Delete";

// utils
import { removeGist } from "../../../utils/GenericFunctions/GenericFunctions";

const RemoveGist = ({ apiItem }: any) => {
  const removeAGist = async (id: string) => {
    let response = await removeGist(id);
    if (response) return response;
  };
  return (
    <span className="spanWrap" onClick={() => removeAGist(apiItem.id)}>
      <DeleteIcon className="blueIcon" />
      Remove
    </span>
  );
};
export default RemoveGist;
