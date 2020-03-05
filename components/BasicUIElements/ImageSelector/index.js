import React, {memo} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import theme from '../../../config/theme';
import {showImagePicker} from '../../../services/imagePicker.service';

library.add(faImage);

const ImageSelector = ({
                         title,
                         callback,
                         whatToShow,
                         image,
                       }) => {
  return (
    <TouchableOpacity
      style={style.imagePickerContainer(whatToShow.showSelector, image)}
      onPress={showImagePicker.bind(this, {title, callback})}
    >
      {
        whatToShow.showSelector &&
        <FontAwesomeIcon
          icon={'image'}
          color={theme.text.greyMedium}
          size={40}
        />
      }
      {
        whatToShow.showImage &&
        <Image
          source={{uri: image}} style={{aspectRatio: 1.5}}
        />
      }
    </TouchableOpacity>

  );
};

ImageSelector.propTypes = {
  title: PropTypes.string,
  callback: PropTypes.func,
  whatToShow: PropTypes.shape({
    showSelector: PropTypes.bool,
    showImage: PropTypes.bool,
  }),
  image: PropTypes.any,
};

ImageSelector.defaultProps = {
  title: 'Select a Picture',
  callback: (response) => {
    console.log('image selector callback');
  },
  whatToShow: {
    showSelector: true,
    showImage: false,
  },
  image: {},
};

ImageSelector.navigationOptions = {};

export default memo(
  ImageSelector,
  (prevProps, nextProps) =>
    (prevProps.image === nextProps.image) && (prevProps.whatToShow === nextProps.whatToShow),
);
