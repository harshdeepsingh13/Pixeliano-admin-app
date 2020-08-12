import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import ImageSelector from '../../components/BasicUIElements/ImageSelector';
import InputText from '../../components/BasicUIElements/InputText';
import Tag from '../../components/Tag';
import TagsContainer from '../../components/TagsContainer';
import AutoComplete from '../../components/AutoComplete';
import {deleteTag, getTagsSuggestion, saveNewPost, updatePost as updatePostService} from '../../services/axios.service';
import Button from '../../components/BasicUIElements/Button';
import {getCloudinaryImageUrl, uploadImage} from '../../services/cloudinary.service';
import config from '../../config/config';
import createToast from '../../services/createToast.service';
import Error from '../../components/Error';
import fs from 'react-native-fs';
import theme from '../../config/theme';
import {getDefaultTags, getItem} from '../../services/asyncStorage.service';

const InsertData = ({navigation, route}) => {
  const isNewPost = useMemo(
    () => (
      !(route.params && Object.keys(route.params).length && !route.params.isNew)
    ),
    []);
  // console.log('na', navigation.state, navigation.state.params, 'isNew', isNewPost);

  const [picture, setPicture] = useState({
    value: undefined,
    isEmpty: false,
  });
  const [caption, setCaption] = useState({
    value: '',
  });
  const [tags, setTags] = useState({
    value: [],
    inputValue: '',
  });
  const [savePostStatus, setSavePostStatus] = useState(config.status.default);
  const [isParentScrollEnabled, setIsParentScrollEnabled] = useState(true);

  useEffect(
    () => {
      if (isNewPost && route.params.image) {
        (async () => {
          const image = await fs.readFile(route.params.image, 'base64');
          setPicture(prev => ({...prev, value: {data: `data:image/*;base64,${image}`}}));
        })();
      }
    },
    [isNewPost, route.params, setPicture],
  );

  useEffect(
    () => {
      if (!isNewPost) {
        const {
          picture: pictureFromNav,
          caption: captionFromNav,
          tags: tagsFromNav,
        } = route.params;
        setPicture({
          ...picture,
          value: {
            ...pictureFromNav,
            data: getCloudinaryImageUrl({publicId: pictureFromNav.shortName}),
          },
        });
        setCaption({
          ...caption,
          value: captionFromNav,
        });
        getItem()
          .then(({defaultTags, isDefaultTagOnEdit} = []) => {
            if (isDefaultTagOnEdit) {
              setTags({
                ...tags,
                value: [...defaultTags, ...tagsFromNav].map(tag => ({tag: tag.tag, tagId: tag.tagId})),
              });
            } else {
              setTags({
                ...tags,
                value: tagsFromNav.map(tag => ({tag: tag.tag, tagId: tag.tagId}))
              });
            }
          })
          .catch(e => {
            console.log('defaultTags error', e);
          });
      } else {
        getDefaultTags()
          .then((defaultTags = []) => {
            setTags({...tags, value: [...defaultTags]});
          })
          .catch(e => {
            console.log('InsertData defaultTags error', e);
          });
      }
    },
    [isNewPost, route.params, setPicture, setCaption, setTags],
  );

  const scrollViewRef = useRef(undefined);
  const inputTagsRef = useRef(undefined);

  const getImage = useCallback(
    (imageResponse) => {
      if (!imageResponse.didCancel) {
        setPicture({
          ...picture,
          value: {
            ...imageResponse,
            data: `data:image/*;base64,${imageResponse.data}`,
          },
        });
      }
    },
    [],
  );
  const handleChange = ({name, value}) => {
    name === 'caption' && setCaption({...caption, value});
    name === 'tags' && setTags(prevTags => ({...prevTags, inputValue: value}));

    if (name === 'tags') {
      scrollViewRef.current.scrollToEnd();
    }
  };
  const addTag = (newTag) => {
    const tag = newTag.isNew ?
      {
        tag: newTag.value,
      } :
      {
        tag: newTag.value,
        tagId: newTag.itemId,
      };
    setTags({
      ...tags,
      value: [...tags.value, tag],
      inputValue: '',
    });
    inputTagsRef.current.blur();
  };
  const removeTag = (index) => {
    setTags((prevTags) => ({
      ...prevTags,
      value: [
        ...prevTags.value.slice(0, index),
        ...prevTags.value.slice(index + 1),
      ],
    }));
  };
  const tagAutoComplete = async () => {
    try {
      const {data: {data}} = await getTagsSuggestion(tags.inputValue);
      const localTags = tags.value.filter(localTag => !!localTag.tagId);
      return data.tags
        .filter(tag => localTags.findIndex(localTag => localTag.tagId === tag.tagId) === -1)
        .map(tag => ({value: tag.tag, itemId: tag.tagId}));
    } catch (e) {
      console.log('error in tags autocomplete', e);
      throw e;
    }
  };

  const onDeleteTag = tag => {
    deleteTag(tag.itemId);
  };

  const handlePostSubmit = async () => {
    // setSavePostStatus(config.status.started);
    isNewPost ?
      await newPost() :
      await updatePost();
  };
  const newPost = async () => {
    try {
      const {public_id, secure_url} = await uploadImage(picture.value.data);
      await saveNewPost({
        picture: {
          fullUrl: secure_url,
          shortName: encodeURIComponent(public_id),
        },
        caption: caption.value,
        tags: tags.value,
      });
      setSavePostStatus({...savePostStatus, status: config.status.success});
      createToast('New Post Saved', 'LONG');
      isNewPost && route.params.image ? navigation.replace('Dashboard') : navigation.goBack();
    } catch (e) {
      if (e.isCloudinaryError) {
        setSavePostStatus({...savePostStatus, status: config.status.failed, message: e.message});
      } else {
        setSavePostStatus({...savePostStatus, status: config.status.failed});
      }
      console.log('new post error', e);
    }
  };
  const updatePost = async () => {
    let fullUrl = '';
    let shortName = '';
    try {
      if (!picture.value.pictureId) {
        const {public_id, secure_url} = await uploadImage(picture.value.data);
        fullUrl = secure_url;
        shortName = public_id;
      }
      await updatePostService({
        picture: picture.value.pictureId ?
          {...picture.value} :
          {
            fullUrl,
            shortName,
          },
        caption: caption.value,
        tags: tags.value,
        postId: route.params.postId,
      });
      setSavePostStatus({...savePostStatus, status: config.status.success});
      createToast('Post Updated', 'LONG');
      route.params.whenPostUpdates();
      navigation.goBack();
    } catch (e) {
      if (e.isCloudinaryError) {
        setSavePostStatus({...savePostStatus, status: config.status.failed, message: e.message});
      } else {
        setSavePostStatus({...savePostStatus, status: config.status.failed});
      }
      console.log('update post error', e);
    }
  };

  return (
    // <KeyboardAvoidingView behavior={'height'}>
    <>
      {
        savePostStatus.status === config.status.failed &&
        <Error
          errorType={'displayError'}
          message={savePostStatus.message}
        />
      }
      <ScrollView
        nestedScrollEnabled={true}
        ref={scrollViewRef}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'on-drag'}
        scrollEnabled={isParentScrollEnabled}
      >
        <ImageSelector
          title={'Select an Image'}
          callback={getImage}
          image={picture.value ? `${picture.value.data}` : ''}
          whatToShow={
            useMemo(
              () => ({
                showSelector: !picture.value,
                showImage: !!picture.value,
              }),
              [picture.value],
            )
          }
        />
        <TagsContainer>
          {
            useMemo(
              () => (
                tags.value.map(({tag, tagId}, index) =>
                  (
                    <Tag
                      key={tagId ? tagId : Math.floor((Math.random() * 10000) + 1)}
                      tagId={index}
                      tagText={tag}
                      onClose={removeTag}
                      tagStyles={
                        {
                          backgroundColor: index <= (config.instagramTagLimit - 1) ? theme.basicColors.lightBlueGrey : '',
                        }
                      }
                    />
                  ))
              ),
              [tags.value],
            )
          }
        </TagsContainer>
        <AutoComplete
          inputValue={tags.inputValue}
          autoCompleteService={tagAutoComplete}
          itemSelectCallback={addTag}
          deleteItemCallback={onDeleteTag}
        >
          {
            inputValue => (
              <InputText
                name={'tags'}
                id={'tags'}
                placeholder={'Tags'}
                value={inputValue}
                iconName={'hashtag'}
                handleChange={handleChange}
                ref={inputTagsRef}
                handleFocus={() => setIsParentScrollEnabled(false)}
                handleBlur={() => {
                  setTags({...tags, inputValue: ''});
                  setIsParentScrollEnabled(true);
                }}
              />
            )
          }
        </AutoComplete>
        <InputText
          name={'caption'}
          id={'caption'}
          capitalize={'sentences'}
          iconName={'closed-captioning'}
          placeholder={'Caption'}
          multiline={true}
          value={caption.value}
          numberOfLines={10}
          returnKeyType={'none'}
          handleChange={handleChange}
          styles={{fontSize: 16}}
        />
        <Button
          text={isNewPost ? 'Save Record' : 'Update Record'}
          handleClick={() => {
            setSavePostStatus({...savePostStatus, status: config.status.started});
            handlePostSubmit();
          }}
          showActivityIndicator={savePostStatus.status === config.status.started}
          styles={
            {
              width: '90%',
              flexDirection: 'column',
              alignSelf: 'center',
              padding: 15,
            }
          }
        />
      </ScrollView>
    </>
    // </KeyboardAvoidingView>
  );
};

InsertData.propTypes = {};

export default InsertData;
