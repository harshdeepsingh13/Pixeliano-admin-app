import React from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import style from './styles.js';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faClone, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import theme from '../../config/theme';

library.add(faExclamationTriangle, faClone);

const NoPosts = ({reason, navigation}) => {

  return (
    <View style={style.noPostsContainer}>
      <View style={style.icon}>
        {
          reason === 'no_post' &&
          <TouchableNativeFeedback
            useForeground={true}
            background={TouchableNativeFeedback.Ripple('', true)}
            onPress={() => navigation.navigate('InsertData')}>
            <FontAwesomeIcon
              icon={'clone'}
              size={55}
              color={theme.light.button.primary}
              style={{...style.icon}}
            />
          </TouchableNativeFeedback>
        }
        {
          reason === 'network_error' &&
          <FontAwesomeIcon
            icon={'exclamation-triangle'}
            size={55}
            color={'red'}
            style={{...style.icon}}
          />
        }
      </View>
      <Text style={style.message}>
        {
          reason === 'network_error' &&
          'You\'re offline, connect to internet and try again.'
        }
        {
          reason === 'no_post' &&
          'Create a post and it will appear here.'
        }
      </Text>
    </View>
  );
};

NoPosts.propTypes = {
  reason: PropTypes.oneOf(['default', 'network_error', 'no_post']),
};

NoPosts.defaultProps = {
  reason: 'no_post',
};

NoPosts.navigationOptions = {};

export default withNavigation(NoPosts);
