import {axiosCloudinarySignatureInstance} from './axiosInstance.service';
import config from '../config/config';

const transformationsMapping = {
  width: 'w',
  height: 'h',
  quality: 'q',
};

export const uploadImage = async (
  imageData,
) => {
  try {
    const {data} = await axiosCloudinarySignatureInstance({
      method: 'POST',
      url: `${config.cloudinary.apiURL}image/upload/`,
      data: {
        file: imageData,
        upload_preset: config.cloudinary.uploadPreset,
      },
    });
    return data;
  } catch (e) {
    console.log('eee', e.response.data);
    throw {
      isCloudinaryError: true,
      message: 'Resource is larger than 10MB',
    };
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
