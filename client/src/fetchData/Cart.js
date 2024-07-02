import axios from "./axios";
const baseUrl = "/cart"

export const getCartOfUser = () => {
    return axios.get(baseUrl + "/")
}

export const addCourseToCart = (courseId) => {
    return axios.put(baseUrl + "/add", {courseId : courseId})
}

export const removeCourseFromCart = (courseId) => {
    
    return axios.put(baseUrl + "/remove", {courseId : courseId})
}

export const moveToCart = ( courseId) => {
    return axios.put(baseUrl + "/update" ,  {courseId : courseId , later:true}  )
}
export const saveForLater = ( courseId) => {
    return axios.put(baseUrl + "/update" ,  {courseId : courseId , later: false} )
}