import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import AppNavigation from './App.navigation';
import theme from './config/theme';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import SplashScreen from 'react-native-splash-screen';
import {getToken} from './services/asyncStorage.service';
import resetStackWithNavigateRoute from './services/resetStackWithNavigateRoute.service';

library.add(faCode);

const App = props => {
  useEffect(
    () => {
      StatusBar.setBackgroundColor(theme.light.primaryDark);
      StatusBar.setBarStyle('light-content');
      (async () => {
        const token = await getToken();
        // props.navigation.navigate('Home');
        if (token) {
          // props.navigation.push('Home');
          resetStackWithNavigateRoute(props.navigation, 'Dashboard');
        } else {
          // props.navigation.navigate('SignIn');
          resetStackWithNavigateRoute(props.navigation, 'SignIn');
        }
        // props.navigation.dispatch('Home');

        SplashScreen.hide();
      })();
    },
    [],
  );
  return (
    <View/>
  );
};

App.propTypes = {};

App.navigationOptions = {
  headerShown: false,
};

export default AppNavigation(App);
