import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

export default StyleSheet.create({
  inputFieldsContainer: {
    // marginRight: 40,
    // marginLeft: 40,
    // flexDirection: 'row',
    // justifyContent: 'center'
  },
  fieldContainer: {
    // flex: 1,
    // width: 300,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    // width: '100%',
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  errorContainer: {},
  passwordVisibleTouchable: {},
  buttonContainer: {
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: theme.light.button.primary,
  },
  secondaryButton: {
    borderColor: theme.light.primaryDark,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  menuButton: {
    borderColor: theme.light.primaryDark,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  buttonText: (themeArgs) => ({
    color: themeArgs === 'primary' ? 'white' : theme.light.primaryDark,
    textAlign: 'center',
  }),
  hamburgerContainer: {
    borderRadius: 10000,
    overflow: 'hidden',
  },
  hamburger: {
    height: 50,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
