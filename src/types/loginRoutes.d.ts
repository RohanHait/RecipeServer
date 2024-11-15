interface LoginBody {
    username : string;
    password : string;
}
interface LoginResponse {
    token : string;
}
interface RegisterBody {
    username : string;
    email : string;
    password : string;
}


export { LoginBody, LoginResponse, RegisterBody }