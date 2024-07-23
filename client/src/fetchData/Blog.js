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
export const updateBlogStatus = (blogId, status) => {
    return axios.put(`${baseUrl}/${blogId}`, { status });
  };
export const deleteBlog = (id) => {
    return axios.delete(baseUrl + '/' + id)
}
export const createComment = (blogId, newComment) => {
    return axios.post(`${baseUrl}/${blogId}/comments`, newComment);
};
export const getComments = (blogId) => {
    return axios.get(`${baseUrl}/${blogId}/comments`);
};
export const updateComment = (blogId, commentId, updatedComment) => {
    return axios.put(`${baseUrl}/${blogId}/comments/${commentId}`, updatedComment);
};

export const deleteComment = (blogId, commentId) => {
    return axios.delete(`${baseUrl}/${blogId}/comments/${commentId}`);
};