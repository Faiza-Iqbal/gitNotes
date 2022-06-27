let accessToken = localStorage.getItem("accessToken");

// to convert date-time string to measure time from current date
export const showDateInDays = (created_at_date: string): string => {
  let timeString: string = "";
  let totalMilliSeconds: number = +new Date() - +new Date(created_at_date);
  let timeAgo: number = Math.floor(totalMilliSeconds / 86400000);
  if (timeAgo > 0) return (timeString += `${timeAgo} days ago`);
  timeAgo = Math.floor(totalMilliSeconds / (60 * 60 * 1000));
  if (timeAgo > 0) return (timeString += `${timeAgo} hours ago`);
  timeAgo = Math.floor(totalMilliSeconds / (60 * 1000));
  return (timeString += `${timeAgo} minutes ago`);
};

// Star a gist call
export const starGist = async (gist_id: string) => {
  let resp = await fetch(`https://api.github.com/gists/${gist_id}/star`, {
    method: "PUT",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Length": "0",
    },
  });
  if (resp.status === 204) return true;
  else return false;
};

// Fork a gist call
export const forkGist = async (gist_id: string) => {
  let response = await callToApi(
    `https://api.github.com/gists/${gist_id}/fork`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    }
  );
  return response;
};

// Edit a gist call
export const editGist = async (gist_id: string) => {
  let response = await callToApi(`https://api.github.com/gists/${gist_id}`, {
    method: "POST",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return response;
};

// Remove a gist call
export const removeGist = async (gist_id: string) => {
  let response = await fetch(`https://api.github.com/gists/${gist_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  if (response.status === 204) return gist_id;
  else return false;
};

export const goToRoute = (url: string, param: string | number = "") => {
  let pageUrl = url;
  if (param) pageUrl = `${url}/${param}`;
  return pageUrl;
};

export const deleteUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

// for API calls
export const callToApi = async (route:string, headers:any) => {
  try {
    const response = await fetch(route, headers);
    return response.json();
  } catch (err) {
    console.error(`API error: ${err}`);
  }
};