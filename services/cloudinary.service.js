import axios from 'axios';
import config from '../config/config';
import qs from 'qs';

const transformationsMapping = {
  width: 'w',
  height: 'h',
  quality: 'q',
};

export const uploadImage = async (
  imageData,
) => {
  try {
    const {data} = await axios({
      method: 'POST',
      url: `${config.cloudinary.apiURL}image/upload/`,
      data: {
        file: imageData,
        upload_preset: config.cloudinary.uploadPreset,
      },
      transformRequest: (data, headers) =>
        qs.stringify(data),
    });
    return data;
  } catch (e) {
    console.log('eee', e.response.data);
    throw e;
  }
};

export const getCloudinaryImageUrl = ({
                                        publicId,
                                        transformations,
                                      }) => {
  /*
  transformations ----
  width
  height
  quality
  * */
  if (transformations && Object.keys(transformations).length !== 0) {
    const transformationArray = [];
    for (let [key, value] of Object.entries(transformations)) {
      transformationArray.push(`${transformationsMapping[key]}_${value}`);
    }
    return `${config.cloudinary.secureDeliveryURL}${transformationArray.join(',')}/${publicId}`;
  } else {
    return `${config.cloudinary.secureDeliveryURL}${publicId}`;
  }
};
