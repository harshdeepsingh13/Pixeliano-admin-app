import {CommonActions} from '@react-navigation/native';

export default (navigationProp, navigationRouteName = 'Home') => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: navigationRouteName,
      },
    ],
  });
  navigationProp.dispatch(resetAction);
}
