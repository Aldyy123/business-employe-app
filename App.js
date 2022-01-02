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
  Pressable,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transaksi from './src/Components/Transaksi';
import RiwayatTransaksi from './src/Components/RiwayatTransaksi';
const Stack = createNativeStackNavigator();

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transaksi')}>
        <Image
          style={styles.image}
          source={require('./src/Assets/image-1.png')}
        />
        <Text style={styles.textBtn}>Masukan Transaksi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History')}>
        <Image
          style={styles.image}
          source={require('./src/Assets/image-3.png')}
        />
        <Text style={styles.textBtn}>History Transaksi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
  );
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Transaksi" component={Transaksi} />
          <Stack.Screen name="History" component={RiwayatTransaksi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

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
