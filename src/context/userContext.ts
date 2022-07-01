import { createContext } from "react";

let initialUserValue = {
  avatar_url: "",
  created_at: "",
  gists_url: "",
  id: "",
  login: "",
  html_url: "",
};

const userContext = createContext({ user: initialUserValue, accessToken: "" });

export default userContext;
