import { useState } from "react";
import BrowseFile from "../../components/common/BrowseFile/BrowseFile";
import { callToApi } from "../../components/common/GenericFunctions/CallToApi";
import Header from "../../components/common/Header/Header";
import { ContainerStyled } from "../../styles/Container.style";

import "./ProfilePage.css"
const ProfilePage = () =>{
    const[fileName, setFileName] = useState('');
    const[gistDesc, setGistDesc] = useState('');
    const[gistContent, setGistContent] = useState('');
    
    const handleChangeDesc = (e:any) => {
        setGistDesc(e.target.value);
      };
      const handleChangeFileName = (e:any) => {
        setFileName(e.target.value);
      };
      const handleChangeContent = (e:any) => {
        setGistContent(e.target.value);
      };
      let accessToken = localStorage.getItem('accessToken');
      const createGist =() =>{
        let requestData : any = {
            description: gistDesc,
            'public': true,
            files : 
                {
                }        };
        requestData.files[fileName] = {
            content: gistContent
        }
        callToApi('https://api.github.com/gists',{ 
         method: "POST",
        headers:{
        Authorization: `token ${accessToken}`,
        },
        body : JSON.stringify(requestData)
    })
      }
    return(
        <>  
           <Header />
           <ContainerStyled>
           <div className="outerWrapper pd-50">
            <input type="text" value={gistDesc} onChange={handleChangeDesc} placeholder="Enter gist description..." />
            <input type="text" value={fileName} onChange={handleChangeFileName} placeholder="Enter File Name..." />
            <textarea rows={20} value={gistContent} onChange={handleChangeContent} placeholder="Enter file content..."></textarea>
           </div>
            <div className="outerWrapper pd-50">
                <BrowseFile />
                <button onClick={createGist} className="greenButton">Create Gist</button>
            </div>
           </ContainerStyled>
          
        </>
    )
}
export default ProfilePage;