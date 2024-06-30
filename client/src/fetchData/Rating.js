import axios from "./axios";
// import axios1 from "axios"
const getRatingByCourseId = (courseId) =>{
    return axios.get(`rating/${courseId}/ratings`);
}

const getAvgRating = (courseId) => {
    return axios.get(`rating/${courseId}/averageRating`);
}
const postRating = (rating) =>{
    return axios.post("/rating", rating);
}
export {
    getRatingByCourseId,
    getAvgRating,
    postRating
}