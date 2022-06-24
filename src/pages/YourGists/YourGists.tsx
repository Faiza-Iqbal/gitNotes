// src
import { useEffect, useState } from "react";
import Gists from "../../components/common/Gists/Gists";

// hooks
import useFetch from "../../hooks/useFetch";

const YourGists = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [gists, setGists] = useState([]);
  // const apiData = useFetch("https://api.github.com/gists", {
  //   headers: {
  //     Authorization: `token ${accessToken}`,
  //   },
  // });
  const getGists = async () => {
    const res = await fetch("https://api.github.com/gists", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const data = await res.json();
    setGists(data);
  };

  useEffect(() => {
    getGists();
  }, []);

  return <Gists isStarred={0} apiData={gists} />;
};
export default YourGists;
