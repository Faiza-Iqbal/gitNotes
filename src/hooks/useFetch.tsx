// lib
import { useState, useEffect } from "react";
import axios from "axios";

type headersType = {
  headers: {
    [key: string]: any;
  };
};
const useFetch = (url: string, headers?: headersType) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url, headers);
        setData(response.data);
      } catch (err) {
        console.log("API ERROR", err);
      }
    })();
  }, []);

  return data;
};

export default useFetch;
