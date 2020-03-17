import React, {useEffect} from 'react';
import {View} from 'react-native';
import config from '../../config/config';
import {deleteItem, getToken} from '../../services/asyncStorage.service';
import resetStackWithNavigateRoute from '../../services/resetStackWithNavigateRoute.service';
import HamMenu from '../../components/HamMenu';
import FloatingButton from '../../components/BasicUIElements/FloatingButton';
import Posts from '../../components/Posts';

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
    <View style={{height: '100%'}}>
      <Posts/>
      <FloatingButton handleOnClick={() => props.navigation.navigate('InsertData')}/>
    </View>
  );
};

Dashboard.propTypes = {};

Dashboard.navigationOptions = ({navigation}) => ({
  headerRight: (arg) => {
    // console.log('a', arg);
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
