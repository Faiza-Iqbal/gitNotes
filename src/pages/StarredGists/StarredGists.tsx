// lib
import { useContext } from "react";

// src
import Gists from "../../components/common/Gists/Gists";
import userContext from "../../context/userContext";
import useFetch from "../../hooks/useFetch";

const StarredGists = () => {
  const auth = useContext(userContext);

  const apiData = useFetch("https://api.github.com/gists/starred?per_page=5", {
    method: "GET",
    headers: {
      Authorization: `token ${auth?.accessToken}`,
    },
  });

  return <Gists apiData={apiData} isStarred />;
};
export default StarredGists;
