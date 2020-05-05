import React from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import theme from '../../config/theme';

library.add(faTimes);

const Tag = ({
               tagId,
               tagText,
               toClose,
               onClose,
               tagStyles,
             }) => {
  return (
    <View style={style.tagContainer}>
      <View style={[style.tag, tagStyles]}>
        <Text style={style.tagText}>
          {
            tagText
          }
        </Text>
        {
          toClose &&
          <TouchableNativeFeedback
            onPress={onClose.bind(this, tagId)}
            background={TouchableNativeFeedback.Ripple(theme.light.primary)}
          >
            <FontAwesomeIcon
              icon={'times'}
              style={style.closeIcon}
              size={20}
            />
          </TouchableNativeFeedback>
        }
      </View>
    </View>
  );
};

Tag.propTypes = {
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tagText: PropTypes.string.isRequired,
  toClose: PropTypes.bool,
  onClose: PropTypes.func,
  tagStyles: PropTypes.object,
};

Tag.defaultProps = {
  tagId: -1,
  tagText: 'Default Tag',
  onClose: () => console.log('tag on close'),
  toClose: true,
  tagStyles: {},
};

Tag.navigationOptions = {};

export default Tag;
