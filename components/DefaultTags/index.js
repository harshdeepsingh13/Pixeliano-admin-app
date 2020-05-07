import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {getItem, updateDefaultTagOnEdit, updateDefaultTags} from '../../services/asyncStorage.service';
import TagsContainer from '../TagsContainer';
import Tag from '../Tag';
import config from '../../config/config';
import theme from '../../config/theme';
import AutoComplete from '../AutoComplete';
import InputText from '../BasicUIElements/InputText';
import {getTagsSuggestion, saveDefaultTags} from '../../services/axios.service';
import Button from '../BasicUIElements/Button';
import Error from '../Error';
import createToast from '../../services/createToast.service';

const DefaultTags = ({setIsParentScrollEnabled, parentScrollRef}) => {

  const [defaultTags, setDefaultTags] = useState([]);
  const [inputTagText, setInputTagText] = useState('');
  const [saveDefaultTagsStatus, setSaveDefaultTagsStatus] = useState({
    status: config.status.default,
    message: '',
  });
  const [onEdit, setOnEdit] = useState(false);

  const inputDefaultTagsRef = useRef(undefined);

  useEffect(
    () => {
      getItem()
        .then(({defaultTags, isDefaultTagOnEdit} = []) => {
          setDefaultTags(defaultTags);
          setOnEdit(isDefaultTagOnEdit);
        })
        .catch(e => {
          console.log('defaultTags error', e);
        });
    },
    [],
  );

  const tagAutoComplete = async () => {
    try {
      const {data: {data}} = await getTagsSuggestion(inputTagText);
      const localTags = defaultTags.filter(localTag => !!localTag.tagId);
      return data.tags
        .filter(tag => localTags.findIndex(localTag => localTag.tagId === tag.tagId) === -1)
        .map(tag => ({value: tag.tag, itemId: tag.tagId}));
    } catch (e) {
      console.log('error in tags autocomplete', e);
      throw e;
    }
  };

  const removeTag = (index) => {
    setDefaultTags((prevTags) => ([
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]));
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
    setDefaultTags(prevTags => ([
      ...prevTags,
      tag,
    ]));
    setInputTagText('');
    inputDefaultTagsRef.current.blur();
  };

  const handleChange = ({value}) => {
    parentScrollRef.current.scrollToEnd();
    setInputTagText(value);
  };

  const handleSaveTags = async () => {
    try {
      setSaveDefaultTagsStatus({...saveDefaultTagsStatus, status: config.status.started});
      const {data: {data}} = await saveDefaultTags(defaultTags);
      await updateDefaultTags(config.storageKey.userDetails, [...data.tags]);
      createToast('Default Tags Updated', 'LONG');
      setSaveDefaultTagsStatus({...saveDefaultTagsStatus, status: config.status.success});
    } catch (e) {
      console.log('handleSaveTags error', e);
      setSaveDefaultTagsStatus({
        ...saveDefaultTagsStatus,
        status: config.status.failed,
        message: config.errorMessages.APIresponseMessages[500],
      });
    }
  };

  const handleOnEditToggle = async () => {
    try {
      let updatedValue = !onEdit;
      setOnEdit(prevValue => {
        updatedValue = !prevValue;
        return !prevValue;
      });
      await updateDefaultTagOnEdit(config.storageKey.userDetails, updatedValue);
      createToast('Updated', 'LONG');
    } catch (e) {
      console.log('handleOnEditToggle error', e);
    }
  };

  return (
    <>
      {
        saveDefaultTagsStatus.status === config.status.failed &&
        <Error
          message={saveDefaultTagsStatus.message}
          errorType={'displayError'}
        />
      }
      <View style={style.defaultTagsContainer}>
        <TagsContainer>
          {
            useMemo(
              () => (
                defaultTags.map(({tag, tagId}, index) =>
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
                      tagTextStyles={{fontSize: 10}}
                    />
                  ))
              ),
              [defaultTags],
            )
          }
        </TagsContainer>
        <AutoComplete
          inputValue={inputTagText}
          autoCompleteService={tagAutoComplete}
          itemSelectCallback={addTag}
        >
          {
            inputTagText => (
              <InputText
                name={'tags'}
                id={'tags'}
                placeholder={'Default Tags'}
                value={inputTagText}
                iconName={'hashtag'}
                handleChange={handleChange}
                handleFocus={() => setIsParentScrollEnabled(false)}
                handleBlur={() => {
                  setInputTagText('');
                  setIsParentScrollEnabled(true);
                }}
                ref={inputDefaultTagsRef}
              />
            )
          }
        </AutoComplete>
        <Button
          styles={
            {
              width: 300,
              marginTop: 9,
              alignSelf: 'center',
            }
          }
          text={'Save Default Tags'}
          handleClick={handleSaveTags}
          showActivityIndicator={saveDefaultTagsStatus.status === config.status.started}
        />
        <View style={style.onEditSwitchContainer}>
          <Text>Show Default Tags on Edit?</Text>
          <Switch
            value={onEdit}
            style={style.onEditSwitch}
            onChange={handleOnEditToggle}
          />
        </View>
      </View>
    </>
  );

};

DefaultTags.propTypes = {
  setIsParentScrollEnabled: PropTypes.func,
  parentScrollRef: PropTypes.any,
};

export default DefaultTags;
