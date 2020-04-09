import {getToken} from './asyncStorage.service';
import axios from 'axios';
import qs from 'qs';
import mainConfig from '../config/config';
import '../shim';
import crypto from 'crypto';

const axiosInstance = axios.create();
const axiosCloudinarySignatureInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await getToken()}`;
  return config;
});

axiosCloudinarySignatureInstance.interceptors.request.use((config) => {
  config.transformRequest = (data, headers) => {
    data.api_key = mainConfig.cloudinary.apiKey;
    data.timestamp = Date.now();
    const signatureData = {...data};
    delete signatureData.file;
    delete signatureData.api_key;
    const signatureString = Object.keys(signatureData).sort().map(key => {
      return `${key}=${signatureData[key]}`;
    }).join('&');
    const shasum = crypto.createHash('sha1');
    shasum.update(`${signatureString}${mainConfig.cloudinary.apiSecret}`);
    const signature = shasum.digest('hex');
    // const signature = cryptoJS.SHA1(signatureString);
    console.log('data', signatureData, signatureString, signature);
    data.signature = signature;
    return qs.stringify(data);
  };
  return config;
});

export default axiosInstance;
export {
  axiosInstance,
  axiosCloudinarySignatureInstance,
};
