import {getToken} from './asyncStorage.service';
import axios from 'axios';

const axiosInstance = axios.create();
let token;
getToken().then(t => token = t);

axiosInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await getToken()}`;
  return config;
});

export default axiosInstance;
