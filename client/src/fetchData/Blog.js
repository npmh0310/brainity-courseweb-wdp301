import axios from "./axios";
const baseUrl = "/blogs"


export const createBlog = (newBlog) => {
    return axios.post(baseUrl + "/" , newBlog)
}

export const getAllBlog = () => {
    return axios.get(baseUrl+ "/")
}
export const getBlogById = (id) => {
    return axios.get(baseUrl+ "/" + id)
}
export const getBlogUser = () => {
    return axios.get(baseUrl + "/blogUser")
}

export const deleteBlog = (id) => {
    return axios.delete(baseUrl + '/' + id)
}