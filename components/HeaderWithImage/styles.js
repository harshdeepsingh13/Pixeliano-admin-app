import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWithImageContainer: {
    // height: 56,
    // height: 300,
    elevation: 20,
    // backgroundColor: theme.light.primaryDark,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    aspectRatio: 1,
    // opacity: 0.9,
  },
});
