import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {styles} from '../Transaksi';
import {convertPriceIDR} from '../../helper/utils';
import {insertTransition} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import {CommonActions} from '@react-navigation/native';

class TransactionOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      listProduct: [
        {label: 'Galon', value: 'Galon'},
        {label: 'Es Batu', value: 'Es Batu'},
        {label: 'Cup Ciler', value: 'Cup Ciler'},
        {label: 'Plastik HD', value: 'Plastik HD'},
        {label: 'Kresek', value: 'Kresek'},
      ],
      jumlah: [],
      harga: [],
      count: 1,
      isUndefined: false,
      duplicateProduct: false,
      total: '0',
      showAlertSuccess: false,
      showAlertFail: false,
    };
  }
  TypeProducts = props => {
    if (this.state.product) {
      return (
        <>
          <View>
            <Text style={styles.textTitle}>Produk</Text>
            <RNPickerSelect
              style={{viewContainer: styles.pickerStyle}}
              onValueChange={value => this.choseeProduct(value, props.index)}
              items={this.state.listProduct}
              itemKey={props.index}
              value={this.state.product[props.index - 1]}
              placeholder={{label: 'Masukan input produk'}}
            />
          </View>
          <View>
            <Text style={styles.textTitle}>Harga Beli</Text>
            <TextInput
              style={[
                styles.pickerStyle,
                {color: this.props.theme.colors.text},
              ]}
              value={this.state.harga[props.index - 1]}
              placeholder={'Masukan harga barang yang akan dibeli...'}
              onChangeText={value => this.inputHarga(value, props.index)}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
          <View style={styles.marginBetween}>
            <Text style={styles.textTitle}>Jumlah Beli</Text>
            <TextInput
              style={[
                styles.pickerStyle,
                {color: this.props.theme.colors.text},
              ]}
              value={this.state.jumlah[props.index - 1]}
              onChangeText={value => this.inputJumlah(value, props.index)}
              placeholder={'Masukan jumlah barang yang akan dibeli...'}
              keyboardType={'numeric'}
              dataDetectorTypes={'all'}
            />
          </View>
        </>
      );
    }
    return null;
  };

  addProductView() {
    const renderView = [];
    let i = 1;
    while (i <= this.state.count) {
      renderView.push(<this.TypeProducts key={i} index={i} />);
      i = i + 1;
    }
    return renderView;
  }

  addCounter() {
    this.setState({count: this.state.count + 1});
  }

  subtractCounter() {
    this.setState({count: this.state.count - 1});
  }

  listArrayUpdate(index, value, stateArray) {
    const {jumlah, product, harga} = this.state;
    let productChose = [...stateArray];
    let arrayCheckUndefined = [...harga, ...product, ...jumlah];

    productChose[index - 1] = value;
    if (value.length < 1) {
      const indexArray = productChose.indexOf(value);
      productChose.splice(indexArray, 1);
    }

    const undefinedArray = arrayCheckUndefined.indexOf(undefined);
    if (undefinedArray >= 0) {
      this.setState({isUndefined: true});
    } else if (undefinedArray <= -1) {
      this.setState({isUndefined: false});
    }

    return productChose;
  }

  choseeProduct(value, index) {
    const listProduct = this.listArrayUpdate(index, value, this.state.product);
    this.filterDuplicateProduct(listProduct);
    this.setState({product: listProduct});
  }
  inputJumlah(value, index) {
    const listJumlah = this.listArrayUpdate(index, value, this.state.jumlah);
    this.setState({jumlah: listJumlah});
  }
  inputHarga(value, index) {
    const listHarga = this.listArrayUpdate(index, value, this.state.harga);
    this.setState({harga: listHarga});
  }

  filterDuplicateProduct(listProduct) {
    const product = [...listProduct];
    const set = new Set(product);
    let result = false;
    this.setState({duplicateProduct: false});
    console.log(...listProduct);

    if (product.length !== set.size) {
      console.log(set);
      result = true;
      this.setState({duplicateProduct: true});
    }
    if (result) {
      return Alert.alert(
        'Produk sama',
        'Maaf ada produk yang sama, produk tidak boleh sama.',
      );
    } else {
      return null;
    }
  }

  productFilterSubmit() {
    let arrayData = [];
    let data = {};
    for (let i = 0; i < this.state.product.length; i++) {
      switch (this.state.product[i]) {
        case 'Galon':
          data = {
            product: this.state.product[i],
            date: new Date().getTime(),
            qty: this.state.jumlah[i],
            price: this.state.harga[i],
            totalPrices: this.state.harga[i] * this.state.jumlah[i],
            type: 'out',
          };
          break;

        case 'Es Batu':
          data = {
            product: this.state.product[i],
            date: new Date().getTime(),
            qty: this.state.jumlah[i],
            price: this.state.harga[i],
            type: 'out',
            totalPrices: this.state.harga[i] * this.state.jumlah[i],
          };
          break;

        case 'Cup Ciler':
          data = {
            product: this.state.product[i],
            date: new Date().getTime(),
            qty: this.state.jumlah[i],
            price: this.state.harga[i],
            type: 'out',
            totalPrices: this.state.harga[i] * this.state.jumlah[i],
          };
          break;

        case 'Plastik HD':
          data = {
            product: this.state.product[i],
            date: new Date().getTime(),
            qty: this.state.jumlah[i],
            price: this.state.harga[i],
            type: 'out',
            totalPrices: this.state.harga[i] * this.state.jumlah[i],
          };
          break;

        case 'Kresek':
          data = {
            product: this.state.product[i],
            date: new Date().getTime(),
            qty: this.state.jumlah[i],
            price: this.state.harga[i],
            totalPrices: this.state.harga[i] * this.state.jumlah[i],
            type: 'out',
          };
          break;

        default:
          break;
      }
      arrayData.push(data);
    }
    return arrayData;
  }

  submitProduct() {
    if (this.state.duplicateProduct) {
      this.filterDuplicateProduct(this.state.product);
    } else {
      try {
        const datas = this.productFilterSubmit();
        datas.map(async data => {
          insertTransition(data);
        });
        this.setState({showAlertSuccess: true});
      } catch (error) {
        console.log(error);
        this.setState({showAlertFail: true});
      }
    }
  }

  countTotalPrice() {
    const {harga, jumlah, count, product, isUndefined} = this.state;
    let totalPrice = 0;
    if (
      count === product.length &&
      count === jumlah.length &&
      count === harga.length &&
      !isUndefined
    ) {
      this.state.product.map((value, i) => {
        totalPrice += this.state.jumlah[i] * this.state.harga[i];
      });
      totalPrice = convertPriceIDR(totalPrice);
      return totalPrice.toString();
    }
    return totalPrice.toString();
  }

  addAndRemoveElementProduct() {
    if (this.state.count <= this.state.listProduct.length) {
      return (
        <>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={this.addCounter.bind(this)}>
            <Text style={styles.textBtn}>Tambah Barang +</Text>
          </TouchableOpacity>
          {this.state.count !== 1 ? (
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this.subtractCounter.bind(this)}>
              <Text style={styles.textBtn}>Kurangi barang -</Text>
            </TouchableOpacity>
          ) : null}
        </>
      );
    } else if (this.state.count > this.state.listProduct.length) {
      return (
        <>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={this.subtractCounter.bind(this)}>
            <Text style={styles.textBtn}>Kurangi barang -</Text>
          </TouchableOpacity>
        </>
      );
    }
  }

  render() {
    const {
      count,
      product,
      jumlah,
      isUndefined,
      harga,
      showAlertSuccess,
      showAlertFail,
    } = this.state;
    return (
      <>
        {this.addProductView()}
        <View style={styles.container}>
          {this.addAndRemoveElementProduct()}
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Total Pembayaran</Text>
          <TextInput
            style={[styles.pickerStyle, {color: this.props.theme.colors.text}]}
            value={this.countTotalPrice()}
            editable={false}
            keyboardType={'numeric'}
            dataDetectorTypes={'all'}
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            disabled={
              count === product.length &&
              count === jumlah.length &&
              count === harga.length &&
              !isUndefined
                ? false
                : true
            }
            onPress={this.submitProduct.bind(this)}
            style={
              count === product.length &&
              count === jumlah.length &&
              count === harga.length &&
              !isUndefined
                ? styles.submitBtn
                : styles.disableBtn
            }>
            <Text style={styles.textBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
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
          onConfirmPressed={() => {
            this.setState({showAlertSuccess: false});
            this.props.navigation.dispatch(CommonActions.goBack());
          }}
        />
        <AwesomeAlert
          show={showAlertFail}
          showProgress={false}
          title="Failed"
          message="Maaf ada kesalahan!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Selesai"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({showAlertFail: false});
          }}
        />
      </>
    );
  }
}

export default TransactionOut;
