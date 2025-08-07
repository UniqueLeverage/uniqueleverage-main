import axios from "axios";

const Axios = axios.create({
    // baseURL: 'http://192.18.150.70:8090/customerInvAPI/',
    // baseURL: 'https://uniqueleverage.com/miguel/proxyAPIInv.php?/',
    baseURL: 'https://api.ul.techndev.com/v1/srp/dealerships',
});

Axios.interceptors.request.use(request => {
    return request;
});

export default Axios;