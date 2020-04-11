import theme from './config/theme';
import React from 'react';
import SignIn from './containerComponents/SignIn';
import Dashboard from './containerComponents/Dashboard';
import RegisterUser from './containerComponents/RegisterUser';
import InsertData from './containerComponents/InsertData';
import ViewPost from './containerComponents/ViewPost';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HamMenu from './components/HamMenu';
import {deleteItem} from './services/asyncStorage.service';
import resetStackWithNavigateRoute from './services/resetStackWithNavigateRoute.service';

const Stack = createStackNavigator();

export default App => (initialProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.light.primary,
          },
          headerMode: 'screen',
          headerTitleStyle: {
            // fontWeight: 'bold'
          },
          title: 'RSS Generator',
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name={'Home'}
        >
          {
            (props) => <App
              initialProps={initialProps}
              {...props}
            />
          }
        </Stack.Screen>
        <Stack.Screen
          name={'SignIn'}
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'RegisterUser'}
          component={RegisterUser}
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={
            ({navigation}) => ({
              headerRight: (arg) =>
                (
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
                ),
            })
          }
        />
        <Stack.Screen
          name={'InsertData'}
          component={InsertData}
          options={({route}) => ({
            title: !(route.params && Object.keys(route.params).length && !route.params.isNew) ? 'Insert a new Record' : 'Edit',
          })}
        />
        <Stack.Screen
          name={'ViewPost'}
          component={ViewPost}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
