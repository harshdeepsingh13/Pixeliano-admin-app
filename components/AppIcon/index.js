import React from 'react';
import {View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCode} from '@fortawesome/free-solid-svg-icons';

library.add(faCode);

const AppIcon = ({
                   size,
                   color,
                 }) => {
  return (
    <View style={style.AppIconContainer}>
      <FontAwesomeIcon
        icon={'code'}
        color={color}
        size={size}
      />
    </View>
  );
};

AppIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
};

AppIcon.defaultProps = {
  size: '',
  color: 'white',
};

AppIcon.navigationOptions = {};

export default AppIcon;
