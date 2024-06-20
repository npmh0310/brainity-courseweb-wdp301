import axios from "./axios";


export const getLessonById = (id) => {
    return axios.get("/lesson/" + id)
}