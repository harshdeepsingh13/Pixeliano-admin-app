import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  headerWithImageContainer: {
    // height: 56,
    // height: 300,
    elevation: 20,
    backgroundColor: theme.light.primaryDark,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWithImageColor: {
    color: 'white',
  },
  backButton: {
    width: 37,
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex :0
    marginLeft: 13,
    marginRight: 13,
    // marginTop: 6,
    // marginBottom: 6,
  },
  imageContainer: {
    aspectRatio: 1.5,
    opacity: 0.9,
  },
});
