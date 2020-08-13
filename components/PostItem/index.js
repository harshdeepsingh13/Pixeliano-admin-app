import React from 'react';
import {Image, ImageBackground, Text, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {getCloudinaryImageUrl} from '../../services/cloudinary.service';
import {useNavigation} from '@react-navigation/native';
import assets from '../../config/assets';

const PostItem = ({
                    caption,
                    picture,
                    postId,
                    tags,
                    whenPostUpdates,
                  }) => {

  const navigation = useNavigation();

  const getPictureUrl = () => {
    switch (picture.providerName) {
      case 'cloudinary': {
        return getCloudinaryImageUrl({
          publicId: picture.shortName,
          transformations: {
            width: 100,
            quality: 0.4,
          },
        });
      }
      default:
        console.log('no image provider');
        return null;
    }
  };

  return (
    <View style={style.postItemContainer}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.push('ViewPost', {
            caption,
            picture,
            postId,
            tags,
            whenPostUpdates,
          });
        }}
      >
        <View>
          <View style={style.captionTagPictureContainer}>
            <View style={style.captionTagContainer}>
              <Text style={style.caption}>
                {
                  caption.length > 50 ? `${caption.slice(0, 50)}...` : caption
                }
              </Text>
              <View style={style.tagsContainer}>
                {
                  tags.slice(0, 5).map(({tag, tagId}) => (
                    <Text
                      key={tagId}
                      style={style.tag}
                    >
                      {
                        `# ${tag.split(/\s+/).join('_').toLowerCase()}`
                      }
                    </Text>
                  ))
                }
              </View>
            </View>
            <ImageBackground
              source={assets.logo.icon.grey}
              style={style.picture}
            >
              <Image
                style={style.picture}
                source={{uri: getPictureUrl()}}
              />
            </ImageBackground>
          </View>

        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

PostItem.propTypes = {
  caption: PropTypes.string,
  picture: PropTypes.shape({
    pictureId: PropTypes.string.isRequired,
    providerName: PropTypes.string,
    shortName: PropTypes.string,
  }),
  postId: PropTypes.string,
  tags: PropTypes.array,
  whenPostUpdates: PropTypes.func,
};

PostItem.navigationOptions = {};

export default PostItem;
