import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import theme from './config/theme';
import React from 'react';
import AppIcon from './components/AppIcon';
import SignIn from './containerComponents/SignIn';
import Dashboard from './containerComponents/Dashboard';
import RegisterUser from './containerComponents/RegisterUser';

export default containedComponent => {
  const appNavigator = createStackNavigator(
    {
      Home: {
        screen: containedComponent,
        /* navigationOptions: {
            title: "RSS"
         }*/
      },
      SignIn: SignIn,
      RegisterUser:RegisterUser,
      Dashboard: Dashboard,
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
      },
    },
  );
  return createAppContainer(appNavigator);
};
