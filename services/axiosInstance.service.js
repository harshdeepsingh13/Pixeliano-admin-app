import {getToken} from './asyncStorage.service';
import axios from 'axios';

const axiosInstance = axios.create();
let token;
getToken().then(t => token = t);

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
