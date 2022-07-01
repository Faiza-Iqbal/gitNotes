import axios from "axios";

let accessToken = localStorage.getItem("accessToken");

// to convert date-time string to measure time from current date
export const showDateInDays = (created_at_date: string): string => {
  let timeString = "";
  let totalMilliSeconds: number = (new Date()).getTime() - (new Date(created_at_date)).getTime();
  let timeAgo = Math.floor(totalMilliSeconds / 86400000);
  if (timeAgo > 0) return (timeString += `${timeAgo} days ago`);
  timeAgo = Math.floor(totalMilliSeconds / (60 * 60 * 1000));
  if (timeAgo > 0) return (timeString += `${timeAgo} hours ago`);
  timeAgo = Math.floor(totalMilliSeconds / (60 * 1000));
  return (timeString += `${timeAgo} minutes ago`);
};

// Star a gist call
export const starGist = async (gist_id: string) => {
  try {
    let resp = await callToApi(`https://api.github.com/gists/${gist_id}/star`, {
      method: "PUT",
      headers: {
        Authorization: `token ${accessToken}`,
        "Content-Length": "0",
      },
    });
    if (resp && resp.status === 204) return true;
  } catch (err) {
    console.log("API ERROR", err);
  }
};

// Fork a gist call
export const forkGist = async (gist_id: string) => {
  try {
    let response = await callToApi(
      `https://api.github.com/gists/${gist_id}/fork`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${accessToken}`,
        }
      }
    );
    
    return response;

  } catch (err) {
    console.log("API ERROR", err);
  }
};

// Edit a gist call
export const editGist = async (gist_id: string) => {

  try{
    let response = await callToApi(`https://api.github.com/gists/${gist_id}`, {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    
    return response;
  }
  catch(err){
    console.log("API ERROR", err);
  }

};

// Remove a gist call
export const removeGist = async (gist_id: string) => {

  try{
    let response = await axios.delete(`https://api.github.com/gists/${gist_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    if (response.status === 204) return gist_id;
  }
  catch(err){
    console.log("API ERROR", err);
  }
};

export const goToRoute = (url: string, param?: string | number) => {
  let pageUrl = url;
  if (param) pageUrl = `${url}/${param}`;
  return pageUrl;
};

export const deleteUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

// for API calls 
type headersType = {
  method: string,
  headers: {
    [key: string]: any
  },
  body?: string
}
export const callToApi = async (route: string, headers: headersType) => {
  try {
    // const response = await fetch(route, headers);
    // return response;
    if(headers?.method === "POST"){
      const response = await axios.post(route, headers);
      return response;
    }
    if(headers?.method === "PUT"){
      const response = await axios.put(route, headers);
      return response;
    }
    if(headers?.method === "GET"){
      const response = await axios.get(route, headers);
      return response;
    }

  } 
  catch (err) {
    console.error(`API error: ${err}`);
  }
};
