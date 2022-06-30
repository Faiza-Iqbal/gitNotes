type userType = {
  [key: string]: any;
};

export const authService = () => {
  let user: any = localStorage.getItem("user") || "{}";
  const accessToken = localStorage.getItem("accessToken") || "";
  user = JSON.parse(user) as userType;
  
  return { user, accessToken };
};
