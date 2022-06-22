// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCodeFork} from "@fortawesome/free-solid-svg-icons";
import { forkGist } from '../GenericFunctions/GenericFunctions';
import { useState } from "react";

const ForkWithCount =({id,count}:any)=>{
    const[forkCount, setForkCount] = useState(count);
    const user = localStorage.getItem('user');
    const forkAGist = async (id:string)=>{
        if(forkCount > 0) return;
    if(user){
        let response = await forkGist(id);
        if(response)
            setForkCount(forkCount+1);
    }
    else  alert("You need to login to star a gist");
    }
    
return(
    <span className="spanWrap">
    <FontAwesomeIcon className="blueIcon" icon={faCodeFork}></FontAwesomeIcon>    
    <span onClick={()=>forkAGist(id)}>Fork</span>
    <span className="counter">{forkCount}</span>
    </span>
)
}
export default ForkWithCount;