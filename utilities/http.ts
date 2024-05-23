import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
    withXSRFToken: true
});

export default http;
