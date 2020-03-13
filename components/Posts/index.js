import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getPosts as getPostsAPI} from '../../services/axios.service';
import config from '../../config/config';
import PostItem from '../PostItem';

const Posts = props => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(posts.length);
  const [getPostsStatus, setGetPostsStatus] = useState(config.status.default);

  useEffect(
    () => {
      getPosts();
    },
    [],
  );

  const getPosts = useCallback(
    () => {
      (async () => {
        try {
          setGetPostsStatus(config.status.started);
          const {data: {data: {posts: postsFromAPI, totalPosts}}} = await getPostsAPI();
          console.log('po', postsFromAPI);
          setPosts([...postsFromAPI]);
          setPostsCount(totalPosts);
          setGetPostsStatus(config.status.success);
        } catch (e) {
          console.log('e', e);
          setGetPostsStatus(config.status.failed);
        }
      })();
    },
    [],
  );

  return (
    <FlatList
      data={posts}
      refreshing={getPostsStatus === config.status.started}
      // renderItem={({item}) => (<View><Text>{JSON.stringify(item)}</Text></View>)}
      renderItem={({item}) => <PostItem
        caption={item.caption}
        picture={{shortName: item.picture.shortName, providerName: item.picture.providerName}}
        tags={item.tags}
        postId={item.postId}
      />}
      keyExtractor={(item) => item.postId}
      onRefresh={getPosts}
    />
  );
};

Posts.propTypes = {};

Posts.navigationOptions = {};

export default Posts;
