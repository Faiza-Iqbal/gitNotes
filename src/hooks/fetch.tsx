import { useState, useEffect } from "react";
const useFetch = (url: string) => {
  const [data, setData] = useState <any []> ([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((resp) => setData(resp));
  }, [url]);
  return data;
};
export default useFetch;
