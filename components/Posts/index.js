import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getPosts as getPostsAPI, getPostsCount} from '../../services/axios.service';
import config from '../../config/config';
import PostItem from '../PostItem';
import NoPosts from '../NoPosts';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [didAnyPostUpdate, setDidAnyPostUpdate] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [getPostsStatus, setGetPostsStatus] = useState(config.status.default);
  const [emptyPostsReason, setEmptyPostsReason] = useState(config.status.default);

  const navigation = useNavigation();

  const getPosts = useCallback(
    () => {
      (async () => {
        try {
          setGetPostsStatus(config.status.started);
          const {data: {data: {postCount: postCountFromApi}}} = await getPostsCount();
          if (postCountFromApi !== postsCount || didAnyPostUpdate) {
            const {data: {data: {posts: postsFromAPI, totalPosts}}} = await getPostsAPI();
            setPostsCount(totalPosts);
            setPosts([...postsFromAPI]);
            if (!totalPosts) {
              setEmptyPostsReason('no_post');
            }
            setGetPostsStatus(config.status.success);
            setDidAnyPostUpdate(false);
          } else {
            setGetPostsStatus(config.status.success);
          }
        } catch (e) {
          if (e.isAxiosError && e.message === 'Network Error') {
            setPosts([]);
            setEmptyPostsReason('network_error');
          }
          setGetPostsStatus(config.status.failed);
        }
      })();
    },
    [
      postsCount,
      didAnyPostUpdate,
      setDidAnyPostUpdate,
      setPosts,
      setPostsCount,
      setGetPostsStatus,
      setEmptyPostsReason,
    ],
  );

  useEffect(
    () => {
      // getPosts();
      return navigation.addListener(
        'focus',
        () => {
          getPosts();
        },
      );
    },
    [getPosts],
  );

  return (
    <FlatList
      data={posts}
      refreshing={getPostsStatus === config.status.started}
      // renderItem={({item}) => (<View><Text>{JSON.stringify(item)}</Text></View>)}
      renderItem={({item}) => <PostItem
        caption={item.caption}
        picture={{
          shortName: item.picture.shortName,
          providerName: item.picture.providerName,
          pictureId: item.picture.pictureId,
        }}
        tags={item.tags}
        whenPostUpdates={() => setDidAnyPostUpdate(true)}
        postId={item.postId}
      />}
      keyExtractor={(item) => item.postId}
      initialNumToRender={10}
      ListEmptyComponent={<NoPosts reason={emptyPostsReason}/>}
      onRefresh={getPosts}
    />
  );
};

Posts.propTypes = {};

Posts.navigationOptions = {};

export default React.memo(Posts);
