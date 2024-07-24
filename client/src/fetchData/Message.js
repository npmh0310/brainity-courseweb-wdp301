import axios from "./axios";
const baseUrl = "/message"

export const getAllMessages = () => {
    return axios.get(baseUrl + "/")
}

export const getAllPreviewMessages = (options) => {
    const params = new URLSearchParams(options);
    if(!options) {options = {size: 10, page: 1}};
    return axios.get(baseUrl + "/previewMessages", params)  
}

export const getMessagesByRoomName = (roomName, options) => {
    return axios.get(baseUrl + "/" + roomName + "?page="+options.page+"&size="+options.size)
}

export const markAllFromRoomAsRead = (roomName) => {
    console.log("markAllFromRoomAsRead")
    return axios.put(baseUrl  + "/markAllAsRead" + "/" + roomName)
}