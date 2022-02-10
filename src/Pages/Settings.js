import React, {useContext, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const {height} = Dimensions.get('window');
import {initialState, reducer, UserContext} from '../Redux/reducer';

const styles = StyleSheet.create({
  profileImage: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  lineCap: {
    width: '90%',
    alignSelf: 'center',
    height: 10,
    borderRadius: 50,
    marginTop: 20,
    justifyContent: 'center',
    display: 'flex',
  },
  btnSettings: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginTop: 10,
    shadowOffset: {height: 20, width: 20},
    shadowColor: 'red',
  },
  textSettings: {
    color: 'black',
  },
  btnLogOut: {
    backgroundColor: 'red',
    marginBottom: 50,
    padding: 10,
    borderRadius: 50,
  },
  textLogOut: {
    textAlign: 'center',
    color: 'white',
  },
  squareRadiuses: {
    backgroundColor: '#92A9BD',
    width: '100%',
    height: height / 1.3,
    padding: 10,
    marginTop: 50,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function Settings({navigation}) {
  const theme = useTheme();
  const readData = useContext(UserContext);
  const [state] = useReducer(reducer, initialState);

  const logOut = async () => {
    try {
      await AsyncStorageLib.clear();
      await readData();
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <View style={styles.profileImage}>
        <View style={styles.profileInfo}>
          <Text>{state?.sessionLogin.data.name}</Text>
          <Text>Es permen karet</Text>
        </View>
        <View>
          <Text>Edit</Text>
        </View>
      </View>
      <View
        style={[
          styles.lineCap,
          {backgroundColor: theme.dark ? 'white' : 'black'},
        ]}
      />
      <View style={styles.squareRadiuses}>
        <View>
          <TouchableOpacity
            style={[styles.btnSettings, {marginTop: 50}]}
            onPress={() => {
              navigation.navigate('SettingOutlite');
            }}>
            <Text style={styles.textSettings}>Pengaturan Harga</Text>
            <Image source={require('../Assets/arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSettings}>
            <Text style={styles.textSettings}>Cabang</Text>
            <Image source={require('../Assets/arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSettings}>
            <Text style={styles.textSettings}>
              Pengaturan pengeluaran Barang
            </Text>
            <Image source={require('../Assets/arrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSettings}>
            <Text style={styles.textSettings}>Pengaturan Stocks</Text>
            <Image source={require('../Assets/arrow.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => logOut()} style={styles.btnLogOut}>
            <Text style={styles.textLogOut}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default Settings;
