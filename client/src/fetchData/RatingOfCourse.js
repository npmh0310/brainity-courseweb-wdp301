import axios from "./axios";
const baseUrl = "/rating"

export const getRatingCourse = (courseId) => {
    return axios.get(baseUrl + "/ratingOfCourse/" + courseId)
}