import axios from "axios";

export default function callApi(method = 'GET', url, data) {
    return axios({
        method,
        url,
        data
    })
}