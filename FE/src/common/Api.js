import axios from 'axios';

const API_URL = "http://localhost:5000"

class Api {

    static get(url) {
        return axios.get(API_URL + url).then((response) => {
            console.log(response.data);
            return response.data;
        });
    }

    static post(url, data) {
        return axios.post(API_URL + url, data).then((response) => {
            return response.data;
        });
    }

}

export default Api;