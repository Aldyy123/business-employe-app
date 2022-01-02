import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {styles} from '../Transaksi';
import {convertPriceIDR} from '../../helper/utils';
import {insertTransition} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';

const MoneyIn = ({navigation}) => {
  const [product, setProduct] = useState(0);
  const [listProduct] = useState([
    {label: 'Plastik', value: 2},
    {label: 'Cup', value: 1},
    {label: 'Plastik & Cup', value: 'Plastik & Cup'},
  ]);
  const [jumlah, setJumlah] = useState('');
  const [jumlahCup, setJumlahCup] = useState('');
  const [jumlahPlastik, setJumlahPlastik] = useState('');
  const [nameProduct] = useState([
    {product: 'Cup', price: 5000},
    {product: 'Plastik', price: 4000},
  ]);
  const [total, setTotal] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const typeProducts = () => {
    if (product === 2 || product === 1) {
      return (
        <>
          <View>
            <Text style={styles.textTitle}>Jumlah Beli</Text>
            <TextInput
              value={jumlah}
              style={styles.pickerStyle}
              onChangeText={setJumlah}
              keyboardType={'numeric'}
              placeholder={'Masukan Jumlah Beli'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Total bayar</Text>
            <TextInput
              value={total}
              editable={false}
              style={styles.pickerStyle}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={!jumlah ? true : false}
              onPress={event => btnSubmit(event)}
              style={[
                !jumlah ? styles.disableBtn : styles.submitBtn,
                styles.noteStyle,
                styles.noteStyle,
              ]}>
              <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (product === 'Plastik & Cup') {
      return (
        <>
          <View>
            <Text style={styles.textTitle}>Jumlah Beli Plastik</Text>
            <TextInput
              style={styles.pickerStyle}
              value={jumlahPlastik}
              onChangeText={setJumlahPlastik}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Jumlah Beli Cup</Text>
            <TextInput
              value={jumlahCup}
              style={styles.pickerStyle}
              onChangeText={setJumlahCup}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Total bayar</Text>
            <TextInput
              value={total}
              editable={false}
              style={styles.pickerStyle}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={!jumlahCup || !jumlahPlastik ? true : false}
              onPress={event => btnSubmit(event)}
              style={[
                !jumlahCup || !jumlahPlastik
                  ? styles.disableBtn
                  : styles.submitBtn,
                styles.noteStyle,
              ]}>
              <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
    return null;
  };

  const btnSubmit = async () => {
    const data = productFilterSubmit();
    try {
      await insertTransition(data);
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const productFilterSubmit = () => {
    const data = {
      product: typeProduct,
      time: new Date().toLocaleString(),
      qty: parseInt(jumlah),
      prices: total,
    };
    let typeProduct = product;
    if (product === 1) {
      data.product = 'Cup';
      return data;
    } else if (product === 2) {
      data.product = 'Plastik';
      return data;
    } else {
      data.product = 'Plastik & Cup';
      data.qtyCup = parseInt(jumlahCup);
      data.qtyPlastik = parseInt(jumlahPlastik);
      data.qty = parseInt(jumlahCup) + parseInt(jumlahPlastik);
      return data;
    }
  };

  useEffect(() => {
    if (product >= 1 && product <= 2) {
      const productTotal = convertPriceIDR(
        nameProduct[product - 1].price * jumlah,
      );
      setTotal(productTotal.toString());
    } else if (product === 'Plastik & Cup') {
      const productTotalCup = nameProduct[0].price * jumlahCup;
      const productTotalPlastik = nameProduct[1].price * jumlahPlastik;
      const totalPay = convertPriceIDR(productTotalCup + productTotalPlastik);
      setTotal(totalPay.toString());
    }
  });

  return (
    <>
      <View>
        <Text style={styles.textTitle}>Produk</Text>
        <RNPickerSelect
          style={{viewContainer: styles.pickerStyle}}
          onValueChange={value => setProduct(value)}
          items={listProduct}
        />
      </View>
      {typeProducts()}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="Data telah selesai diinput!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Selesai"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlert(false)}
      />
      <View style={styles.noteStyle}>
        <Text>Note:</Text>
        <Text>Gelas: Rp 5.000</Text>
        <Text>Plastik: Rp 4.000</Text>
      </View>
    </>
  );
};

export default MoneyIn;
