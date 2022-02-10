import React, {useState, useReducer} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TransactionIn from '../Components/Transaksi/TransactionIn';
import TransactionOut from '../Components/Transaksi/TransactionOut';
import RNPickerSelect from 'react-native-picker-select';
import {reducer, initialState} from '../Redux/reducer';
import {setReportFinance, repotDetails} from '../firebase';
import {designData} from '../helper/utils';

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    color: 'black',
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
    marginBottom: 20,
  },
});

const Transaksi = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedValue, setSelectedValue] = useState(null);
  const [typeTransaction] = useState([
    {label: 'Masuk', value: 'Masuk'},
    {label: 'Keluar', value: 'Keluar'},
  ]);
  const [] = useState([
    'Galon',
    'Es Batu',
    'Tutup Cup Plastik',
    'Plastik HD',
    'Kresek',
  ]);
  const NextProduct = () => {
    if (selectedValue === 'Masuk') {
      return (
        <TransactionIn
          navigation={props.navigation}
          theme={props.route.params.theme}
          insertReport={insertReport}
        />
      );
    } else if (selectedValue === 'Keluar') {
      return (
        <TransactionOut
          navigation={props.navigation}
          theme={props.route.params.theme}
          user={state.sessionLogin}
          insertReport={insertReport}
        />
      );
    }
    return null;
  };

  const insertReport = async data => {
    const detailReport = await repotDetails();
    const designObject = designData(data, {detailReport, state});
    await setReportFinance(designObject);
  };

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View>
          <Text style={styles.textTitle}>Tipe Transaksi</Text>
          <RNPickerSelect
            style={{viewContainer: styles.pickerStyle}}
            onValueChange={setSelectedValue}
            items={typeTransaction}
          />
        </View>
        {NextProduct()}
      </View>
    </ScrollView>
  );
};

export {styles};
export default Transaksi;
