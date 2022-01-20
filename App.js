/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Transaksi from './src/Components/Transaksi';
import RiwayatTransaksi from './src/Components/RiwayatTransaksi';
import Keuangan from './src/Components/Keuangan';
import DetailReport from './src/Components/ReportMoney/DetailReport';
import Settings from './src/Components/Settings';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = ({navigation}) => {
  const theme = useTheme();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Transaksi', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('./src/Assets/image-1.png')}
          />
          <Text style={styles.textBtn}>Masukan Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('./src/Assets/image-3.png')}
          />
          <Text style={styles.textBtn}>History Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Keuangan', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('./src/Assets/image-5.png')}
          />
          <Text style={styles.textBtn}>Laporan Keuangan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.image}
            source={require('./src/Assets/image-4.png')}
          />
          <Text style={styles.textBtn}>Management Stock</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const FirstNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="List" component={Home} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="History" component={RiwayatTransaksi} />
        <Stack.Screen name="Keuangan" component={Keuangan} />
        <Stack.Screen name="DetailReport" component={DetailReport} />
      </Stack.Navigator>
    </>
  );
};

const App = () => {
  const schema = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={FirstNavigation} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    padding: 5,
    backgroundColor: '#FF5DA2',
    height: 100,
    margin: 5,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 50,
  },
});

export default App;
