import {NavigationActions, StackActions} from 'react-navigation';

export default (navigationProp, navigationRouteName = 'Home') => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: navigationRouteName})],
  });
  navigationProp.dispatch(resetAction);
}
