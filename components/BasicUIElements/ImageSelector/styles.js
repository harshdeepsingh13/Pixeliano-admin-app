import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

export default StyleSheet.create({
  imagePickerContainer: (showSelector) => ({
    aspectRatio: 1.5,
    backgroundColor: theme.backgroundAndBorders.greyDark,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: showSelector ? 'center': 'stretch',
  }),
});
