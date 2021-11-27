import axios from "axios";

const defaultURL = "http://localhost:8000";
export default function callApi(method = 'GET', url, data, headers = {}) {
    return axios({
        method,
        url: defaultURL + url,
        data,
        headers,
    })
}