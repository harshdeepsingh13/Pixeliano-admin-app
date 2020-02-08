import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import theme from './config/theme';
import React from 'react';
import AppIcon from './components/AppIcon';

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
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme.light.primary,
        },
        headerTitleStyle: {
          // fontWeight: 'bold'
        },
        title: 'RSS Generator',
        headerTintColor: 'white',
        headerLeft: () => <AppIcon
          size={42}
        />,
      },
    },
  );
  return createAppContainer(appNavigator);
};
