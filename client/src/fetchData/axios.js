import axios from "axios";

const instance = axios.create({
    baseURL: 'https://brainity-courseweb-wdp301.onrender.com/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return error.response;
});

export default instance;
