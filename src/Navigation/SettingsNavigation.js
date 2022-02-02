import React from 'react';

import Settings from '../Pages/Settings';
import SettingOutlite from '../Components/Settings/SettingOutlite';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SettingsHome" component={Settings} />
        <Stack.Screen name="SettingOutlite" component={SettingOutlite} />
      </Stack.Navigator>
    </>
  );
};

export default SettingsNavigation;
