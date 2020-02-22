import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const diameter = 55;
export default StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    // zIndex: 2,
    // // bottom: 100,
    bottom: 10,
    right: 10,
    width: diameter,
    height: diameter,
    borderRadius: 100,
    backgroundColor: theme.light.button.primary
  },
  floatingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 19
  },
});
