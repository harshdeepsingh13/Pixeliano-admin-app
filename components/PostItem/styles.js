import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  postItemContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  captionPictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  caption: {
    paddingTop: 5,
    fontSize: 17,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picture: {
    width: 75,
    aspectRatio: 1,
    // height: 100
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    fontStyle: 'italic',
    marginRight: 10,
    color: theme.text.greyLight,
  },
});
