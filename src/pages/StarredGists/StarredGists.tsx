// src
import Gists from "../../components/common/Gists/Gists";
import useFetch from "../../hooks/useFetch";

const StarredGists = () => {
  const accessToken = localStorage.getItem("accessToken");

  const apiData = useFetch("https://api.github.com/gists/starred", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  return <Gists apiData={apiData} />;
};
export default StarredGists;
