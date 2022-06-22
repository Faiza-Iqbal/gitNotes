import { useState, useEffect } from "react";
const useFetch = (url: string, headers:any={}) => {
  const [data, setData] = useState <any []> ([]);
  useEffect(() => {
    fetch(url,headers)
      .then((response) => response.json())
      .then((resp) => {
        setData(resp);
      console.log("resp",resp);
      }
      );
      
  }, [url]);
  return data;
};
export default useFetch;
