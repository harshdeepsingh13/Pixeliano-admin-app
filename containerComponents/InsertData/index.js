import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import ImageSelector from '../../components/BasicUIElements/ImageSelector';
import InputText from '../../components/BasicUIElements/InputText';
import Tag from '../../components/Tag';
import TagsContainer from '../../components/TagsContainer';
import AutoComplete from '../../components/AutoComplete';
import {getTagsSuggestion, saveNewPost, updatePost as updatePostService} from '../../services/axios.service';
import Button from '../../components/BasicUIElements/Button';
import {getCloudinaryImageUrl, uploadImage} from '../../services/cloudinary.service';
import config from '../../config/config';

const InsertData = ({navigation}) => {
  const isNewPost = useMemo(
    () => (
      !navigation.state.params
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

  useEffect(
    () => {
      if (!isNewPost) {
        const {
          picture: pictureFromNav,
          caption: captionFromNav,
          tags: tagsFromNav,
        } = navigation.state.params;
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
        setTags({
          ...tags,
          value: tagsFromNav.map(tag => ({tag: tag.tag, tagId: tag.tagId})),
        });
      }
    },
    [isNewPost, navigation.state.params, setPicture, setCaption, setTags],
  );

  const scrollViewRef = useRef(undefined);

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

    if (name === 'tags' && tags.inputValue.length === 2) {
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
      return data.tags.map(tag => ({value: tag.tag, itemId: tag.tagId}));
    } catch (e) {
      console.log('error in tags autocomplete', e);
      throw e;
    }
  };
  const handlePostSubmit = async () => {
    setSavePostStatus(config.status.started);
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
      setSavePostStatus(config.status.success);
    } catch (e) {
      setSavePostStatus(config.status.failed);
      console.log('new post error', e);
    }
  };
  const updatePost = async () => {
    let fullUrl = '';
    let shortName = '';
    console.log('up picture', picture);
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
        postId: navigation.state.params.postId,
      });
      setSavePostStatus(config.status.success);
    } catch (e) {
      setSavePostStatus(config.status.failed);
      console.log('update post error', e);
    }
  };

  return (
    <KeyboardAvoidingView behavior={'height'} enabled>
      <ScrollView
        nestedScrollEnabled={true}
        ref={scrollViewRef}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'on-drag'}
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
        {/*  {
        picture.value &&
        <Image source={{uri: picture.value.data}} style={{aspectRatio: 1, resizeMode: 'contain'}}/>
      }*/}
        <TagsContainer>
          {
            tags.value.map(({tag, tagId}, index) => (
              <Tag
                key={tagId ? tagId : Math.floor((Math.random() * 1000) + 1)}
                tagId={index}
                tagText={tag}
                onClose={removeTag}
              />
            ))
          }
        </TagsContainer>
        <AutoComplete
          inputValue={tags.inputValue}
          autoCompleteService={tagAutoComplete}
          itemSelectCallback={addTag}
        >
          {
            inputValue => (
              <InputText
                name={'tags'}
                id={'tags'}
                placeholder={'Tags'}
                value={inputValue}
                handleChange={handleChange}
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
        />
        <Button
          handleClick={handlePostSubmit}
          showActivityIndicator={savePostStatus === config.status.started}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

InsertData.propTypes = {};

InsertData.navigationOptions = ({navigation}) => ({
  title: !navigation.state.params ? 'Insert a new Record' : 'Edit',
});

export default InsertData;
