import React, {useReducer} from 'react';
import {reducer, initialState} from '../Redux/reducer';
import {useTheme} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
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

const Home = ({navigation}) => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Transaksi', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('../Assets/image-1.png')}
          />
          <Text style={styles.textBtn}>Masukan Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('History', {
              theme: theme,
              user: state.sessionLogin,
            })
          }>
          <Image
            style={styles.image}
            source={require('../Assets/image-3.png')}
          />
          <Text style={styles.textBtn}>History Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Keuangan', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('../Assets/image-5.png')}
          />
          <Text style={styles.textBtn}>Laporan Keuangan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Stock', {theme: theme})}>
          <Image
            style={styles.image}
            source={require('../Assets/image-4.png')}
          />
          <Text style={styles.textBtn}>Management Stock</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Home;
