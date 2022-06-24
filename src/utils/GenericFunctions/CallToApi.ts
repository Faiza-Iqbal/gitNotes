// for API calls
export const callToApi = async (route:string, headers:any) => {
  try {
    const response = await fetch(route, headers);
    return response.json();
  } catch (err) {
    console.error(`API error: ${err}`);
  }
};
