// lib
import { useEffect, useState } from "react";

// src
import Loader from "../Loader/Loader";

// style
import "./ViewFileContent.css";

interface Props {
  file: string;
}

const ViewFileContent: React.FC<Props> = ({ file }) => {
  const [content, setContent] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(file)
      .then((response) => response.text())
      .then((resp) => {
        setContent(resp.replace(/^(.*)$/gm, '<span class="line">$1</span>'));
        setLoader(false);
      });
  }, []);

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
