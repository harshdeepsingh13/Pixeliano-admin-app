import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  tagContainer: {
    // flexBasis: '30%',
    margin: 10
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: theme.light.button.primary,
    borderBottomWidth: 1.5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: theme.backgroundAndBorders.greyMedium,
  },
  tagText: {
    textTransform: 'capitalize',
    lineHeight: 40,
    fontSize: 16,
    fontStyle: 'italic'
  },
  closeIcon: {
    // padding:
    alignSelf: 'flex-start',
    // width: 100,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 7,
    paddingRight: 7,
    marginLeft: 20,
    opacity: 0.6,
    color: theme.light.primaryDark,
  },
});
