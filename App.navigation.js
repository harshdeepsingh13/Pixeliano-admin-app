import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import theme from './config/theme';
import React from 'react';
import SignIn from './containerComponents/SignIn';
import Dashboard from './containerComponents/Dashboard';
import RegisterUser from './containerComponents/RegisterUser';
import InsertData from './containerComponents/InsertData';
import ViewPost from './containerComponents/ViewPost';

export default containedComponent => {
  const appNavigator = createStackNavigator(
    {
      Home: {
        screen: containedComponent,
        /* navigationOptions: {
            title: "RSS"
         }*/
      },
      SignIn,
      RegisterUser,
      Dashboard,
      InsertData,
      ViewPost,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme.light.primary,
        },
        headerMode: 'screen',
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
