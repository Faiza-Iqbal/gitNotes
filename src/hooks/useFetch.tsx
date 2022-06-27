// lib
import { useState, useEffect } from "react";

const useFetch = (url: string, headers: any = {}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(url, headers)
      .then((response) => response.json())
      .then((resp) => {
        setData(resp);
      });
  }, [url, headers]);

  return data;
};

export default useFetch;
