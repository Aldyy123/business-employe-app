import React, {useState, useContext, useReducer} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {loginEmploye, getSettingsOutlite} from '../firebase';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import {UserContext} from '../Redux/reducer';
import {intialState, reducer} from '../Redux/reducer';

const styles = StyleSheet.create({
  textLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
  },
  container: {
    padding: 50,
  },
  submitBtn: {
    padding: 20,
    backgroundColor: '#FF5DA2',
    borderRadius: 50,
  },
  textSubmit: {
    fontSize: 19,
    textAlign: 'center',
  },
});

function Login() {
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const readData = useContext(UserContext);

  const getProfileEmploye = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const employe = await loginEmploye(username, password);
        const settings = await getSettingsOutlite(employe.data.branchId);
        if (employe.found) {
          await AsyncStorageLib.setItem('login', JSON.stringify(employe));
          await AsyncStorageLib.setItem(
            'settings',
            JSON.stringify(settings._data),
          );
          await readData();
        } else {
          setFailure(true);
          setLoading(false);
        }
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textLogin}>Login</Text>
      </View>
      <View>
        <TextInput
          placeholder={'Masukan username'}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder={'Masukan password'}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => getProfileEmploye()}
          style={styles.submitBtn}>
          <Text style={styles.textSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        showProgress={true}
        title={'loading'}
        useNativeDriver={true}
        onDismiss={() => setLoading(false)}
        show={loading}
      />
      <AwesomeAlert
        title={'Maaf gagal'}
        message={'username atau password anda salah'}
        confirmText={'OK'}
        showConfirmButton={true}
        useNativeDriver={true}
        confirmButtonColor={'red'}
        onConfirmPressed={() => setFailure(false)}
        onDismiss={() => setFailure(false)}
        show={failure}
      />
    </>
  );
}

export default Login;
