import React from 'react';
import {View, Text} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';

const Error = ({
                 message,
                 styles,
                 errorType,
               }) => {
  return (
    <View style={style.errorContainer}>
      <Text style={[style.error, style[errorType]]}>
        {
          message
        }
      </Text>
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  styles: PropTypes.object,
  errorType: PropTypes.oneOf([
    'fieldError',
    'displayError',
  ]),
};

Error.defaultProps = {
  errorType: 'fieldError',
};

Error.navigationOptions = {};

export default Error;
