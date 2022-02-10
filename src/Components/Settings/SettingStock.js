import React, {useState, useReducer} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme, useNavigation, CommonActions} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {reducer, initialState} from '../../Redux/reducer';
import moment from 'moment';
import {setStocks} from '../../firebase';

const SettingStock = () => {
  const theme = useTheme();
  const [susuKecil, setSusuKecil] = useState();
  const [susuBesar, setSusuBesar] = useState();
  const [sirup, setSirup] = useState();
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    titlePage: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
    },
    btnDropdown: {
      width: '100%',
      textAlign: 'left',
    },
    textTitle: {
      textAlignVertical: 'center',
      fontSize: 15,
      marginTop: 10,
    },
    submitBtn: {
      justifyContent: 'center',
      display: 'flex',
      backgroundColor: '#FF5DA2',
      marginTop: 10,
      borderRadius: 50,
    },
    pickerStyle: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginTop: 10,
      color: theme.colors.text,
    },
    noteStyle: {
      margin: 20,
    },
    textBtn: {
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 10,
      color: 'white',
    },
    disableBtn: {
      backgroundColor: 'grey',
      color: 'grey',
      opacity: '0.5',
    },
    marginBetween: {
      marginBottom: 10,
    },
  });

  const btnSubmit = async () => {
    const data = {
      date: moment().format('MMM dd, yyyy'),
      susu_kecil: susuKecil,
      susu_besar: susuBesar,
      sirup,
      branchId: state.sessionLogin.data.branchId,
    };
    await setStocks(data);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.titlePage}>Pengaturan Stocks</Text>
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Susu 1kg</Text>
          <TextInput
            style={styles.pickerStyle}
            keyboardType={'numeric'}
            value={susuKecil}
            onChangeText={setSusuKecil}
          />
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Susu 2,5kg</Text>
          <TextInput
            style={styles.pickerStyle}
            keyboardType={'numeric'}
            value={susuBesar}
            onChangeText={setSusuBesar}
          />
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Sirup</Text>
          <TextInput
            style={styles.pickerStyle}
            keyboardType={'numeric'}
            value={sirup}
            onChangeText={setSirup}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={() => btnSubmit()}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <AwesomeAlert
        show={success}
        showProgress={false}
        title="Success"
        message="Data telah selesai diinput!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Selesai"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setSuccess(true);
          navigation.dispatch(CommonActions.goBack());
        }}
      />
    </>
  );
};

export default SettingStock;
