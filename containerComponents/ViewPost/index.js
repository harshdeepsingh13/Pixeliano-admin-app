import React, {useEffect} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import HeaderWithImage from '../../components/HeaderWithImage';
import theme from '../../config/theme';
import ViewCaption from '../../components/ViewCaption';
import TagsContainer from '../../components/TagsContainer';
import Tag from '../../components/Tag';
import FloatingButton from '../../components/BasicUIElements/FloatingButton';

const ViewPost = ({
                    navigation,
                    route,
                  }) => {

  const {
    caption,
    picture,
    postId,
    tags,
  } = route.params;

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
        handleOnClick={() => navigation.replace('InsertData', {
          caption,
          picture,
          postId,
          tags,
        })}
      />
    </View>
  );
};

ViewPost.propTypes = {};

export default ViewPost;
