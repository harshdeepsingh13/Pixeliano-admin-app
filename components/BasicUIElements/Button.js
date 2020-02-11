import React from 'react';
import {View, TouchableNativeFeedback, Text, ActivityIndicator} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import theme from '../../config/theme';

const Button = ({
                  text,
                  handleClick: handleClickFromProps,
                  theme: themeFromProps,
                  styles,
                  showActivityIndicator,
                }) => {

  const onPressHandle = () => {
    handleClickFromProps();
  };

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        themeFromProps === 'primary' ? theme.light.button.primaryDark : theme.light.primary,
        false,
      )}
      onPress={onPressHandle}
      // style={{flexDirection: 'row', justifyContent: 'center'}}
    >
      <View style={[
        style.buttonContainer,
        style[`${themeFromProps}Button`],
        styles,
      ]}>
        {
          showActivityIndicator ?
            <ActivityIndicator
              color={themeFromProps === 'primary' ? 'white' : theme.light.primaryDark}
            /> :
            <Text style={style.buttonText(themeFromProps)}>
              {
                text
              }
            </Text>
        }
      </View>
    </TouchableNativeFeedback>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  theme: PropTypes.oneOf(['primary', 'secondary']),
  styles: PropTypes.object,
  showActivityIndicator: PropTypes.bool,
};

Button.defaultProps = {
  text: 'Button',
  handleClick: () => console.log('Button handleClick'),
  theme: 'primary',
  styles: undefined,
  showActivityIndicator: false,
};

Button.navigationOptions = {};

export default Button;
