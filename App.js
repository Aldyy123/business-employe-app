/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, createContext, useReducer} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from './src/Navigation/HomeNavigation';
import SettingsNavigation from './src/Navigation/SettingsNavigation';
import Login from './src/Pages/Login';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
import {UserContext, reducer, initialState} from './src/Redux/reducer';

const App = () => {
  const schema = useColorScheme();
  const [sessionLogin, setSessionLogin] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    const user = JSON.parse(await AsyncStorageLib.getItem('login'));
    if (user !== null) {
      dispatch({type: 'GET_USER', user});
    } else {
      dispatch({type: 'GET_USER', user: null});
    }
    setSessionLogin(user);
  };

  return (
    <AppearanceProvider>
      <UserContext.Provider value={readData}>
        <NavigationContainer
          theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
          {sessionLogin?.found ? (
            <Tab.Navigator
              screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  if (route.name === 'Beranda') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Pengaturan') {
                    iconName = focused ? 'settings' : 'settings-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
              })}>
              <Tab.Screen name="Beranda" component={HomeNavigation} />
              <Tab.Screen name="Pengaturan" component={SettingsNavigation} />
            </Tab.Navigator>
          ) : (
            <Login />
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </AppearanceProvider>
  );
};

export default App;
