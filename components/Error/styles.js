import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  errorContainer: {
    // margin: 10,
    // marginRight: 5,
    width: '100%',
  },
  error: {
    width: '100%',
    color: 'red',
    textTransform: 'capitalize',
  },
  fieldError: {
    fontStyle: 'italic',
    textAlign: 'right',
  },
  displayError: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.backgroundAndBorders.lightRed,
    fontWeight: 'bold',
  },
});
