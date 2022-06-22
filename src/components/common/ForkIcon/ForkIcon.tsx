import { useState } from "react";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { forkGist } from '../GenericFunctions/GenericFunctions';

const ForkIcon = ({id,count}:any) => {
    const user = localStorage.getItem('user');
        const[forkCount, setForkCount] = useState(count);
        const forkAGist = async (id:string)=>{
            if(forkCount > 0) return;
            if(user)
           {
            let response = await forkGist(id);
            if(response ) setForkCount(forkCount+1);
           }
            else alert("You need to login to fork a gist");
        }
    return  <FontAwesomeIcon onClick={()=>forkAGist(id)} className={forkCount ? "forked" : "greenIcon"} icon={faCodeFork}></FontAwesomeIcon>
}
export default ForkIcon;