import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  noPostsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  icon: {},
  message: {
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.text.greyMedium,
    // lineHeight: 60
    padding: 10,
    paddingTop: 25,
    paddingBottom: 25,
  },
});
