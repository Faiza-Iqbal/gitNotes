import Gists from "../../components/common/Gists/Gists";
import useFetch from "../../hooks/useFetch";

const YourGists = () =>{
    const accessToken = localStorage.getItem('accessToken');
    const apiData = useFetch('https://api.github.com/gists', {headers:{
        Authorization: `token ${accessToken}`,
      }});
      console.log("apiDataaa",apiData);
    return <Gists apiData ={apiData} />
}
export default YourGists;