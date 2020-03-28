import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

export default StyleSheet.create({
  fullScreenLoaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.backgroundAndBorders.greyMedium,
    opacity: 0.8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.light.primaryDark,
  },
  message: {
    fontSize: 18,
    fontStyle: 'italic',
    color: theme.light.button.primaryDark,
    paddingTop: 5,
    paddingBottom: 5,

  },
});
