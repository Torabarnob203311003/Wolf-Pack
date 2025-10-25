import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5001/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 100000,
});

export default axiosSecure;