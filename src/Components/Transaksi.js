import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MoneyIn from './Transaksi/MoneyIn';
import MoneyOut from './Transaksi/MoneyOut';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  btnDropdown: {
    width: '100%',
    textAlign: 'left',
  },
  textTitle: {
    color: 'red',
    textAlignVertical: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  submitBtn: {
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#FF5DA2',
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

class Transaksi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      typeTransaction: [
        {label: 'Masuk', value: 'Masuk'},
        {label: 'Keluar', value: 'Keluar'},
      ],
      outProducts5: [
        'Galon',
        'Es Batu',
        'Tutup Cup Plastik',
        'Plastik HD',
        'Kresek',
      ],
    };
  }

  nextProduct() {
    if (this.state.selectedValue === 'Masuk') {
      return <MoneyIn />;
    } else if (this.state.selectedValue === 'Keluar') {
      return <MoneyOut />;
    }
    return null;
  }

  render() {
    console.log(this.props.navigation.getState());
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <View>
            <Text style={styles.textTitle}>Tipe Transaksi</Text>
            <RNPickerSelect
              style={{viewContainer: styles.pickerStyle}}
              onValueChange={value => this.setState({selectedValue: value})}
              items={this.state.typeTransaction}
            />
          </View>
          {this.nextProduct()}
        </View>
      </ScrollView>
    );
  }
}

export {styles};
export default Transaksi;
