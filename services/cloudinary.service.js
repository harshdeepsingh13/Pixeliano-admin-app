import axios from 'axios';
import config from '../config/config';
import qs from 'qs';

export const uploadImage = async (
  imageData,
) => {
  try {
    const {data} = await axios({
      method: 'POST',
      url: `${config.cloudinary.apiURL}`,
      data: {
        file: imageData,
        upload_preset: 'l9tt1r43',
      },
      transformRequest: (data, headers) =>
        qs.stringify(data),
    });
    return data
  } catch (e) {
    console.log('eee', e.response.data);
    throw e;
  }
};
