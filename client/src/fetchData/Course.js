import axios from "./axios";

const getAllCourse = ()=>{
    return axios.get('/course')
}

export {
    getAllCourse
}