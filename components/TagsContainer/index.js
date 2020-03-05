import React from 'react';
import {View} from 'react-native';
import style from './styles.js';

const TagsContainer = ({children}) => {
  return (
    <View style={style.tagsContainer}>
      {
        children
      }
    </View>
  );
};

TagsContainer.propTypes = {};

TagsContainer.navigationOptions = {};

export default TagsContainer;
