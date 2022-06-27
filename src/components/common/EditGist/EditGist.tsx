// lib
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const EditGist = ({ apiItem }: any) => {
  const navigate = useNavigate();

  const editAGist = async (id: string) => {
    let resp = await fetch(
      apiItem?.files[Object.keys(apiItem?.files)[0]]?.raw_url
    );
    let response = await resp.text();
    apiItem.fileContent = response;
    navigate("/create-gist", { state: apiItem });
  };

  return (
    <span className="spanWrap">
      <BorderColorIcon className="blueIcon" />
      <span onClick={() => editAGist(apiItem.id)}>Edit</span>
    </span>
  );
};
export default EditGist;
