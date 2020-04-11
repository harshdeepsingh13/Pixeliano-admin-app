import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import HeaderWithImage from '../../components/HeaderWithImage';
import theme from '../../config/theme';
import ViewCaption from '../../components/ViewCaption';
import TagsContainer from '../../components/TagsContainer';
import Tag from '../../components/Tag';
import FloatingButton from '../../components/BasicUIElements/FloatingButton';
import config from '../../config/config';
import FullScreenLoader from '../../components/BasicUIElements/FullScreenLoader';
import {deletePost as deletePostService} from '../../services/axios.service';
import Error from '../../components/Error';

const ViewPost = ({
                    navigation,
                    route,
                  }) => {

  const [deletePostStatus, setDeletePostStatus] = useState({
    status: config.status.default,
    message: '',
  });

  const {
    caption,
    picture,
    postId,
    tags,
    whenPostUpdates
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

  const deletePost = async () => {
    try {
      setDeletePostStatus({...deletePostStatus, status: config.status.started});
      await deletePostService(postId);
      setDeletePostStatus({...deletePostStatus, status: config.status.success});
      navigation.goBack();
    } catch (e) {
      if (e.isAxiosError && e.response) {
        setDeletePostStatus({
          ...deletePostStatus,
          status: config.status.failed,
          message: config.errorMessages.APIresponseMessages.login[e.response.data.status],
        });
        console.log('ee', e.response.data);
      } else {
        setDeletePostStatus({
          ...deletePostStatus,
          status: config.status.failed,
          message: config.errorMessages.APIresponseMessages[500],
        });
      }
    }
  };

  return (
    <View style={{height: '100%'}}>
      {
        deletePostStatus.status === config.status.started &&
        <FullScreenLoader
          loadingMessage={'Deleting Post'}
        />
      }
      {
        deletePostStatus.status === config.status.failed &&
        <Error
          errorType={'displayError'}
          message={deletePostStatus.message}
        />
      }
      <ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      >
        <HeaderWithImage
          imageProvider={picture.providerName}
          imageShortName={picture.shortName}
          isOptionsMenu={true}
          menus={
            [
              {
                text: 'Delete Post',
                handleClick: () => {
                  console.log('deletePost');
                  deletePost();
                },
              },
              {
                text: 'Upload on Instagram',
                handleClick: () => {
                  console.log('uploadOn Instagram');
                },
                disabled: true,
              },
            ]
          }
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
          isNew: false,
          whenPostUpdates
        })}
      />
    </View>
  );
};

ViewPost.propTypes = {};

export default ViewPost;
