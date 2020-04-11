import React, {useEffect} from 'react';
import {View} from 'react-native';
import config from '../../config/config';
import {deleteItem, getToken} from '../../services/asyncStorage.service';
import resetStackWithNavigateRoute from '../../services/resetStackWithNavigateRoute.service';
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
      <FloatingButton handleOnClick={() => props.navigation.navigate('InsertData', {isNew: true})}/>
    </View>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
