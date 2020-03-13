import React, {useEffect} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import HeaderWithImage from '../HeaderWithImage';
import theme from '../../config/theme';
import ViewCaption from '../ViewCaption';
import TagsContainer from '../TagsContainer';
import Tag from '../Tag';
import FloatingButton from '../BasicUIElements/FloatingButton';

const ViewPost = ({
                    navigation,
                  }) => {

  const {
    caption,
    picture,
    postId,
    tags,
  } = navigation.state.params;

  useEffect(
    () => {
      StatusBar.setBackgroundColor('black', true);
      return () => {
        StatusBar.setBackgroundColor(theme.light.primaryDark, true);
      };
    },
    [],
  );

  return (
    <View style={{height: '100%'}}>
      <ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      >
        <HeaderWithImage
          imageProvider={picture.providerName}
          imageShortName={picture.shortName}
        />
        <ViewCaption
          caption={caption}
        />
        <TagsContainer>
          {
            tags.map(({
                        tagId,
                        tag,
                      }) => (
              <Tag
                key={tagId}
                tagId={tagId}
                tagText={tag}
                toClose={false}
              />
            ))
          }
        </TagsContainer>
      </ScrollView>
      <FloatingButton
        iconName={'edit'}
        handleOnClick={() => console.log('12345')}
      />
    </View>
  );
};

ViewPost.propTypes = {};

ViewPost.navigationOptions = {
  headerShown: false,
};

export default ViewPost;
