import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
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