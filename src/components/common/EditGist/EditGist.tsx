// lib
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// style
import { royalblue } from "../../../styles/colorVariables";

const EditGist = ({ apiItem }: any) => {
  const navigate = useNavigate();

  const editAGist = async () => {
    try {
      const url = apiItem?.files[Object.keys(apiItem?.files)[0]]?.raw_url;
      if (!url) throw new Error();

      let response = await axios.get(url);
      apiItem.fileContent = response.data;

      navigate("/create-gist", { state: apiItem });
    } catch (err) {
      console.log("API error: ", err);
      return;
    }
  };

  return (
    <span className="spanWrap">
      <BorderColorIcon style={IconStyled} />
      <span onClick={() => editAGist()}>Edit</span>
    </span>
  );
};
const IconStyled = {
  color: royalblue,
  width: 18,
  height: 16,
};
export default EditGist;
