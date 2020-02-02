import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

export default containedComponent => {
  const appNavigator = createStackNavigator(
    {
      Home: {
        screen: containedComponent,
        /* navigationOptions: {
            title: "RSS"
         }*/
      },
    },
    {
      initialRouteName: 'Home',
    },
  );
  return createAppContainer(appNavigator);
};
