// src
import Gists from "../../components/common/Gists/Gists";

// hooks
import useFetch from "../../hooks/useFetch";

const YourGists = () => {
  const accessToken = localStorage.getItem("accessToken");

  const apiData = useFetch("https://api.github.com/gists", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return <Gists apiData={apiData} />;
};
export default YourGists;
