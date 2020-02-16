import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import config from '../../config/config';
import Button from '../../components/BasicUIElements/Button';
import {deleteItem, getToken} from '../../services/asyncStorage.service';
import resetStackWithNavigateRoute from '../../services/resetStackWithNavigateRoute.service';
import Hamburger from '../../components/BasicUIElements/HamburgerButton';
import HamMenu from '../../components/HamMenu';

const Dashboard = props => {

  useEffect(
    () => {
      (async () => {
        const token = await getToken();
        // props.navigation.navigate('Home');
        if (!token) {
          // props.navigation.push('Home');
          await deleteItem(config.storageKey.userDetails);
          resetStackWithNavigateRoute(props.navigation, 'SignIn');
        }
      })();
    },
    [],
  );

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

Dashboard.propTypes = {};

Dashboard.navigationOptions = ({navigation}) => ({
  headerRight: (arg) => {
    console.log('a', arg);
    return (
      <HamMenu
        buttonColor={arg.tintColor}
        menus={[
          {
            text: 'Logout',
            handleClick: () => {
              (async () => {
                  await deleteItem();
                  resetStackWithNavigateRoute(navigation, 'SignIn');
                }
              )();
            },
          },
        ]}
      />
    );
  },
});

export default Dashboard;
