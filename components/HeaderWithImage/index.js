import React, {useCallback} from 'react';
import {ImageBackground, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getCloudinaryImageUrl} from '../../services/cloudinary.service';
import assets from '../../config/assets';
import {deleteItem} from '../../services/asyncStorage.service';
import resetStackWithNavigateRoute from '../../services/resetStackWithNavigateRoute.service';
import HamMenu from '../HamMenu';

library.add(faArrowLeft);

const HeaderWithImage = ({
                           imageProvider,
                           imageShortName,
                         }) => {

  const navigation = useNavigation();

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
      source={assets.logo.full.grey}
      style={{width: '100%', aspectRatio: 1}}
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
          <View>
            <HamMenu
              buttonColor={'white'}
              menus={[
                {
                  text: 'Delete Post',
                  handleClick: () => {
                    (async () => {
                        await deleteItem();
                        resetStackWithNavigateRoute(navigation, 'SignIn');
                      }
                    )();
                  },
                },
              ]}
            />
          </View>
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

export default HeaderWithImage;
