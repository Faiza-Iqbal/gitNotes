// li
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// src
import userContext from "../../../context/userContext";

const RouteRequiresLogin = () => {
  const auth = useContext(userContext);
  return auth?.user ? <Outlet /> : <Navigate to="/" />;
};

export default RouteRequiresLogin;
