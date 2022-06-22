import { useState } from "react";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar } from "@fortawesome/free-solid-svg-icons";
import { starGist } from '../GenericFunctions/GenericFunctions';

const StarIcon = ({id,count}:any) => {
    const user = localStorage.getItem('user');
        const[starCount, setStarCount] = useState(count);
        const starAGist = async (id:string)=>{
            if(starCount > 0) return;
            if(user)
           {
            let response = await starGist(id);
            if(response )
                setStarCount(starCount+1);
           }
            else  alert("You need to login to star a gist");
        }
    return  <FontAwesomeIcon onClick={()=>starAGist(id)} className={starCount ? "starred" : "greenIcon"} icon={faStar}></FontAwesomeIcon>
}
export default StarIcon;