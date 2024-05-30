import axios from "./axios";
// import axios1 from "axios"

const onLogin = (data) => {
    return axios.post("/auth/login", data);
}

const onRegister = (data) => {
    return axios.post("/auth/register", data);
}

const getProfile = () => {
    return axios.get("/auth/profile");
}

const onLogout = () => {
    return axios.get("/auth/logout");
}

export {
    onLogin,
    onRegister,
    onLogout,
    getProfile
}