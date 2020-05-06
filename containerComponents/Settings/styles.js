import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  settingsContainer: {},
  rssLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  rssLink: {
    flexBasis: '90%',
    lineHeight: 30,
    color: theme.text.greyMedium,
    fontSize: 18
  },
  settings: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: theme.backgroundAndBorders.greyDark,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  copyIcon: {
    // padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  defaultTagsContainer: {
    // minHeight: 250,
    paddingBottom: 100
  }
});
