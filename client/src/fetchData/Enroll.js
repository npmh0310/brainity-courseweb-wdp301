import axios from './axios';

const baseUrl = 'user'

export const enrollCourse = (courseId) => {
    return axios.put(baseUrl + '/enroll/' + courseId)
}