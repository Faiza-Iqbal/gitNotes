import { useEffect, useState } from "react";
import "./ViewFileContent.css";
interface Props {
  file: string;
}
const ViewFileContent: React.FC<Props> = ({file})=> {
  const [content,setContent] = useState('');
  useEffect(()=>{
    fetch(file)
    .then((response)=>response.text())
    .then((resp)=>{
      setContent(resp.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>"));
    });
  },[])
  return (
    <pre><code dangerouslySetInnerHTML={{__html: content}}></code></pre>
  );
}
export default ViewFileContent;
