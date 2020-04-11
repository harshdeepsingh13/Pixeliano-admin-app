import {CommonActions} from '@react-navigation/native';

export default (navigationProp, navigationRouteNames = ['Home'], navigationRouteParams = []) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: navigationRouteNames.map((name, index) => ({
      name: name,
      params: {...navigationRouteParams[index]},
    })),
  });
  navigationProp.dispatch(resetAction);
}
