import ImagePicker from 'react-native-image-picker';

export const showImagePicker = ({
                                  title = 'Select an Image',
                                  callback = (response) => {
                                    console.log('this is the callback with the response', response);
                                  },
                                }) => {
  ImagePicker.showImagePicker(
    {
      title,
      mediaType: 'photo',
    },
    (response) => {
      callback(response);
    },
  );
};


