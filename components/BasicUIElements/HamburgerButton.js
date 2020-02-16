import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import theme from '../../config/theme';

library.add(faEllipsisV);

const HamburgerButton = ({
                     color,
                     handleOnClick: handleOnClickFromProps,
                   }) => {

  const onHamburgerPress = () => {
    console.log('clicnk')
    handleOnClickFromProps();
  };

  return (
    <View style={style.hamburgerContainer}>
      <TouchableNativeFeedback
        onPress={onHamburgerPress}
      >
        <View style={style.hamburger}>
          <FontAwesomeIcon
            icon={'ellipsis-v'}
            color={color}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

HamburgerButton.propTypes = {
  color: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
};

HamburgerButton.defaultProps = {
  color: theme.light.primaryDark,
  handleOnClick: () => console.log('hamburger click'),
};

HamburgerButton.navigationOptions = {};

export default HamburgerButton;
