import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  postItemContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  captionPictureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  caption: {
    paddingTop: 5,
    paddingRight: 5,
    fontSize: 17,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picture: {
    borderRadius: 4,
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
