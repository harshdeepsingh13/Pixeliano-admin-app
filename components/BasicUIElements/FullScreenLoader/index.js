import React, {useEffect, useState} from 'react';
import {Animated, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

library.add(faCode);

const FullScreenLoader = ({
                            loadingMessage,
                          }) => {

  const [messageOpacity, setMessageOpacity] = useState(new Animated.Value(0));

  useEffect(
    () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(messageOpacity, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(messageOpacity, {
            toValue: 0,
            duration: 1000,
          }),
        ]),
      ).start();
    },
    []);

  return (
    <View style={style.fullScreenLoaderContainer}>
      <FontAwesomeIcon
        icon={'code'}
        style={{...style.icon}}
        size={250}
      />
      <Animated.Text style={[style.message, {opacity: (messageOpacity)}]}>
        {
          loadingMessage
        }
      </Animated.Text>
    </View>
  );
};

FullScreenLoader.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
};

FullScreenLoader.defaultProps = {
  loadingMessage: 'Loading',
};

export default FullScreenLoader;
