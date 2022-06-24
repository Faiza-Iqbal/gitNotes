
import { Route } from "react-router-dom";
import LandingPage from "../../../pages/LandingPage/LandingPage";
const user = localStorage.getItem('user');
const RouteRequiresLogin = (props:any) => {
   return (
    <Route {...props}>{user ? props.children : <LandingPage/>}</Route>
   );
};

export default RouteRequiresLogin;