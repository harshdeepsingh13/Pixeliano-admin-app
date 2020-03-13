import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  captionContainer: {},
  caption: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  quotes: {
    color: theme.light.primaryDark,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 2,
  },
  quoteStart: {},
  quoteEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
