import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {styles} from '../../Pages/Transaksi';
import {convertPriceIDR} from '../../helper/utils';
import {insertTransition} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import {CommonActions} from '@react-navigation/native';
import moment from 'moment';

const MoneyIn = ({navigation, theme}) => {
  const [product, setProduct] = useState(0);
  const [listProduct] = useState([
    {label: 'Plastik', value: 2},
    {label: 'Cup', value: 1},
    {label: 'Plastik & Cup', value: 'Plastik & Cup'},
  ]);
  const time = moment().format('YYYY-MM-DD');
  const [jumlah, setJumlah] = useState('');
  const [jumlahCup, setJumlahCup] = useState('');
  const [jumlahPlastik, setJumlahPlastik] = useState('');
  const [nameProduct] = useState([
    {product: 'Cup', price: 5000},
    {product: 'Plastik', price: 4000},
  ]);
  const [total, setTotal] = useState('');
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertFail, setShowAlertFail] = useState(false);
  const typeProducts = () => {
    if (product === 2 || product === 1) {
      return (
        <>
          <View>
            <Text style={styles.textTitle}>Jumlah Beli</Text>
            <TextInput
              value={jumlah}
              style={[styles.pickerStyle, {color: theme.colors.text}]}
              onChangeText={value => setJumlah(value.replace(/[^1-9]/g, ''))}
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
              style={[styles.pickerStyle, {color: theme.colors.text}]}
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
              style={[styles.pickerStyle, {color: theme.colors.text}]}
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
              style={[styles.pickerStyle, {color: theme.colors.text}]}
              onChangeText={value => setJumlahCup(value.replace(/[^1-9]/g, ''))}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Total bayar</Text>
            <TextInput
              value={total}
              editable={false}
              style={[styles.pickerStyle, {color: theme.colors.text}]}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={!jumlahCup || !jumlahPlastik ? true : false}
              onPress={() => btnSubmit()}
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
    if (data.length === 2) {
      data.map(async value => {
        try {
          await insertTransition(value);
          setShowAlertSuccess(true);
        } catch (error) {
          console.log(error);
          setShowAlertFail(true);
        }
      });
    } else {
      console.log(data);
      try {
        await insertTransition(data);
        setShowAlertSuccess(true);
      } catch (error) {
        console.log(error);
        setShowAlertFail(true);
      }
    }
  };

  const backInHomeDone = () => {
    setShowAlertSuccess(false);
    navigation.dispatch(CommonActions.goBack());
  };

  const productFilterSubmit = () => {
    let data = {
      product: product,
      date: time,
      qty: parseInt(jumlah),
      price: 0,
      totalPrices: 0,
      timestamps: new Date().getTime(),
      type: '',
    };
    if (product === 1) {
      data.product = 'Cup';
      data.price = nameProduct[product - 1].price;
      data.totalPrices = nameProduct[product - 1].price * jumlah;
      data.type = 'in';
      return data;
    } else if (product === 2) {
      data.product = 'Plastik';
      data.price = nameProduct[product - 1].price;
      data.totalPrices = nameProduct[product - 1].price * jumlah;
      data.type = 'in';
      return data;
    } else {
      const ordersAll = [];
      nameProduct.map((value, index) => {
        data = {
          product: value.product,
          date: time,
          qty: index === 0 ? jumlahCup : jumlahPlastik,
          price: value.price,
          totalPrices:
            index === 0 ? value.price * jumlahCup : value.price * jumlahPlastik,
          type: 'in',
          timestamps: new Date().getTime(),
        };
        ordersAll.push(data);
      });
      return ordersAll;
    }
  };

  useEffect(() => {
    setAllTotal();
  });

  const setAllTotal = () => {
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
  };

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
        show={showAlertSuccess}
        showProgress={false}
        title="Success"
        message="Data telah selesai diinput!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Selesai"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => backInHomeDone()}
      />
      <AwesomeAlert
        show={showAlertFail}
        showProgress={false}
        title="Gagal"
        message="Data gagal diinput, ada kesalahan!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlertFail(false)}
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
