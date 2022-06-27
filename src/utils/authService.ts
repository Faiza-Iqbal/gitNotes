
export const  authService:any =()=>{
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    const accessToken = localStorage.getItem("accessToken");
    const auth = {user,accessToken}
    return auth;
}