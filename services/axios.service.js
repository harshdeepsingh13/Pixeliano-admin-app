import axios from 'axios';
import config from '../config/config';
import axiosInstance from './axiosInstance.service';

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

export const getTagsSuggestion = autocomplete =>
  axiosInstance({
    method: 'GET',
    url: `${config.apiUrl}post/getTags`,
    params: {
      q: autocomplete,
    },
  });

export const saveNewPost = ({
                              picture,
                              caption,
                              tags,
                            }) =>
  axiosInstance({
    method: 'POST',
    url: `${config.apiUrl}post/newRecord`,
    data: {
      picture,
      caption,
      tags,
    },
  });

export const updatePost = ({
                             picture,
                             caption,
                             tags,
                             postId,
                           }) =>
  axiosInstance({
    method: 'PUT',
    url: `${config.apiUrl}post/updateRecord`,
    data: {
      picture,
      caption,
      tags,
      postId,
    },
  });

export const getPosts = () =>
  axiosInstance({
    method: 'GET',
    url: `${config.apiUrl}post/getAllPosts`,
  });

export const deletePost = (postId) =>
  axiosInstance({
    method: 'DELETE',
    url: `${config.apiUrl}post/record/${postId}`,
  });

export const getPostsCount = () =>
  axiosInstance({
    method: 'GET',
    url: `${config.apiUrl}post/getPostCount`,
  });

export const saveDefaultTags = (tags) =>
  axiosInstance({
    method: 'PUT',
    url: `${config.apiUrl}user/saveDefaultTags`,
    data: {tags},
  });
