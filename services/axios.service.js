import axios from 'axios';
import config from '../config/config';

export const verifyEmail = (email) =>
  axios({
    method: 'GET',
    url: `${config.apiUrl}user/verifyEmail`,
    params: {
      email,
    },
  });
