import React, {useCallback} from 'react';
import {ImageBackground, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getCloudinaryImageUrl} from '../../services/cloudinary.service';
import assets from '../../config/assets';

library.add(faArrowLeft);

const HeaderWithImage = ({
                           imageProvider,
                           imageShortName,
                           navigation,
                         }) => {

  const getImageUrl = useCallback(
    () => {
      switch (imageProvider) {
        case 'cloudinary': {
          return getCloudinaryImageUrl({publicId: imageShortName});
        }
        default:
          break;
      }
    },
    []);

  return (
    <ImageBackground
      source={assets.logo.full.color}
      style={{width: '100%', aspectRatio: 1.5}}
    >
    <ImageBackground
      source={{uri: getImageUrl()}}
      style={[style.headerWithImageContainer, style.imageContainer]}
    >
      <View style={style.headerContainer}>
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.Ripple('', true)}
          onPress={() => navigation.goBack()}>
          <View style={style.backButton}>
            <FontAwesomeIcon
              icon={'arrow-left'}
              style={{...style.headerWithImageColor}}
              size={20}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </ImageBackground>
    </ImageBackground>
  );
};

HeaderWithImage.propTypes = {
  imageProvider: PropTypes.string,
  imageShortName: PropTypes.string,
};

HeaderWithImage.navigationOptions = {};

export default withNavigation(HeaderWithImage);
