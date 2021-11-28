import axios from "axios";

const defaultURL = "https://smartpoint.herokuapp.com";
export default function callApi(method = 'GET', url, data, headers = {}) {
    return axios({
        method,
        url: defaultURL + url,
        data,
        headers,
    })
}