// lib
import { useState, useEffect } from "react";
import axios from "axios";

type headersType = {
  method: string;
  headers: {
    [key: string]: any;
  };
};

const useFetch = (url: string, headers?: headersType) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        if (headers?.method === "GET") {
          const response = await axios.get(url, headers);
          setData(response.data);
        }
        if (headers?.method === "POST") {
          const response = await axios.post(url, headers);
          setData(response.data);
        }
        if (headers?.method === "PUT") {
          const response = await axios.put(url, headers);
          setData(response.data);
        }
      } catch (err) {
        console.log("API error:", err);
      }
    })();
  }, []);

  return data;
};

export default useFetch;
