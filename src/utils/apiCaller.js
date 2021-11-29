import axios from "axios";

const defaultURL = "https://smartpoints.herokuapp.com";
export default function callApi(method = 'GET', url, data, headers = {}) {
    return axios({
        method,
        url: defaultURL + url,
        data,
        headers,
    })
}