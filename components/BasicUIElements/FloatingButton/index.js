import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faPlus);

const FloatingButton = ({
                          styles,
                          handleOnClick: handleOnClickFromProps,
                        }) => {

  const floatingButtonOnPress = () => {
    handleOnClickFromProps();
  };

  return (
    <TouchableOpacity
      style={style.floatingButtonContainer}
      activeOpacity={0.9}
      onPress={floatingButtonOnPress}
    >
      <View style={style.floatingButton}>
        <FontAwesomeIcon
          icon={'plus'}
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );
};

FloatingButton.propTypes = {
  styles: PropTypes.object,
  handleOnClick: PropTypes.func.isRequired,
};

FloatingButton.defaultProps = {
  handleOnClick: () => console.log('floating button click'),
  styles: {},
};

FloatingButton.navigationOptions = {};

export default FloatingButton;
