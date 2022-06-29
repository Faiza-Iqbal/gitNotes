// lib
import { useEffect, useState } from "react";
import axios from "axios";

// src
import Loader from "../Loader/Loader";

// style
import "./ViewFileContent.scss";

interface Props {
  file: string;
}

const ViewFileContent: React.FC<Props> = ({ file }) => {
  const [content, setContent] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(file);
        const resp = await response.text();
        setContent(resp.replace(/^(.*)$/gm, '<span class="line">$1</span>'));
        setLoader(false);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, [file]);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
      )}
    </>
  );
};
export default ViewFileContent;
