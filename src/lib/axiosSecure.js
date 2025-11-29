import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://server.northstarcompetitions.co.uk/api/v1',
    // baseURL: 'https://59e366476677.ngrok-free.app/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 100000,
});

export default axiosSecure;