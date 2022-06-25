// lib
import { useContext, useEffect, useState } from "react";

// src
import Gists from "../../components/common/Gists/Gists";
import userContext from "../../context/userContext";

const YourGists = () => {
  const auth = useContext(userContext);
  const [gists, setGists] = useState([]);

  const getGists = async () => {
    const res = await fetch("https://api.github.com/gists", {
      headers: {
        Authorization: `token ${auth?.accessToken}`,
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
