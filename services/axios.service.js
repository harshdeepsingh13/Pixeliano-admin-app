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

export const signInUser = (email, password) =>
  axios({
    method: 'GET',
    url: `${config.apiUrl}user/signIn`,
    params: {
      email,
      password,
    },
  });

export const registerNewUser = userDetails =>
  axios({
    method: 'POST',
    url: `${config.apiUrl}user/register`,
    data: {
      ...userDetails,
    },
  });
