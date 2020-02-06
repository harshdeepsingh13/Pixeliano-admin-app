import React from 'react';
import {View, Text} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';

const Error = ({
                 message,
                 styles,
               }) => {
  return (
    <View style={style.errorContainer}>
      <Text style={style.error}>
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
};

Error.navigationOptions = {};

export default Error;
