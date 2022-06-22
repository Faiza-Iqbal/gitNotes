// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCodeFork,
    faStar,
  } from "@fortawesome/free-solid-svg-icons";
import { starGist } from '../GenericFunctions/GenericFunctions';
import { useState } from "react";

const StarWithCount =({id,count}:any)=>{
    const user = localStorage.getItem('user');
    const[starCount, setStarCount] = useState(count);
    const starAGist = async (id:string)=>{
        if(starCount > 0) return;
        if(user){
            let response = await starGist(id);
            if(response)
                setStarCount(starCount+1);
        }
        else  alert("You need to login to star a gist");
    }
    
return(
    <span className="spanWrap">
    <FontAwesomeIcon className="blueIcon" icon={faStar}></FontAwesomeIcon>    
    <span onClick={()=>starAGist(id)}>Star</span>
    <span className="counter">{starCount}</span>
    </span>
)
}
export default StarWithCount;