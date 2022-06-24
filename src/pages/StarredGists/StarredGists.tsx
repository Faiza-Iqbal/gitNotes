// src
import Gists from "../../components/common/Gists/Gists";
import useFetch from "../../hooks/useFetch";

const StarredGists = () => {
  const accessToken = localStorage.getItem("accessToken");

  const apiData = useFetch("https://api.github.com/gists/starred?per_page=5", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  return <Gists apiData={apiData} isStarred={1} />;
};
export default StarredGists;
