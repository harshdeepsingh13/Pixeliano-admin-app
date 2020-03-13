import React from 'react';
import {Text, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';

library.add(faQuoteLeft, faQuoteRight);
const _quoteSize = 25;

const ViewCaption = ({caption}) => {
  return (
    <View style={style.captionContainer}>
      <View style={style.quoteStart}>
        <FontAwesomeIcon
          icon={'quote-left'}
          style={{...style.quotes}}
          size={_quoteSize}
        />
      </View>
      <Text style={style.caption}>
        {
          caption
        }
      </Text>
      <View style={style.quoteEnd}>
        <FontAwesomeIcon
          icon={'quote-right'}
          style={{...style.quotes}}
          size={_quoteSize}
        />
      </View>
    </View>
  );
};

ViewCaption.propTypes = {
  caption: PropTypes.string.isRequired,
};

ViewCaption.navigationOptions = {};

export default ViewCaption;
