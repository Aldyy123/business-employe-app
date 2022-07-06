import React, {useState, useReducer} from 'react';
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, useNavigation, CommonActions} from '@react-navigation/native';
import {reducer, initialState} from '../../Redux/reducer';
import {stock_usage, getStocksBranch, setStocks} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment';

const StockInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [success, setSuccess] = useState(false);
  const [stockNotFound, setStockNotFound] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const renderValueInput = (value, index) => {
    const indexValue = 'value_' + index;
    return {[indexValue]: value.toString()};
  };
  const [stocks, setStock] = useState(['Susu 1kg', 'Susu 2,5kg', 'Sirup']);
  const [values, setValues] = useState({});
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    listStock: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    },
    inputText: {
      textAlign: 'center',
      color: theme.colors.text,
    },
    textTitle: {
      fontSize: 30,
      marginBottom: 30,
    },
    submitBtn: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      marginTop: 20,
    },
  });

  const counterRunning = (type, i) => {
    let index = parseInt(values['value_' + i]) || 0;
    let valueInput;
    switch (type) {
      case 'add':
        index += 1;
        valueInput = renderValueInput(index, i);
        break;

      case 'minus':
        index <= 0 ? 0 : (index -= 1);
        valueInput = renderValueInput(index, i);
        break;

      default:
        return;
    }
    setValues({...values, ...valueInput});
  };

  const checkStocks = async () => {
    const stock = await getStocksBranch(state.sessionLogin.data.branchId);
    if (stock.exists) {
      const stockItems = {
        total_susu_kecil: stock._data.susu_kecil - values.value_0,
        total_susu_besar: stock._data.susu_besar - values.value_1,
        total_sirup: stock._data.sirup - values.value_2,
        branchId: state.sessionLogin.data.branchId,
      };
      return stockItems;
    } else {
      setStockNotFound(true);
      return false;
    }
  };

  const submitStock = async () => {
    try {
      const stockItems = await checkStocks();
      console.log(values);
      if (stockItems && values.length >= 3) {
        const data = {
          susu_kecil: values.value_0,
          susu_besar: values.value_1,
          sirup: values.value_2,
          timestamps: new Date().getTime(),
          date: moment().format('YYYY-MM-DD'),
          ...stockItems,
        };
        console.log(data);
        await setStocks(stockItems);
        await stock_usage(data);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.textTitle, styles.inputText]}>
          Pemakaian Bahan Baku
        </Text>
        <View>
          {stocks.map((stock, i = i + 1) => (
            <View key={i}>
              <View style={styles.listStock}>
                <Text style={{color: theme.colors.text}}>{stock}</Text>
                <View style={[styles.listStock, styles.inputAction]}>
                  <Pressable onPress={() => counterRunning('add', i)}>
                    <Ionicons
                      size={25}
                      name="add-outline"
                      color={theme.colors.text}
                    />
                  </Pressable>
                  <TextInput
                    style={styles.inputText}
                    defaultValue={'0'}
                    value={values['value_' + i]}
                  />
                  <Pressable onPress={() => counterRunning('minus', i)}>
                    <Ionicons
                      name="remove-outline"
                      color={theme.colors.text}
                      size={25}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={async () => await submitStock()}>
          <Text style={styles.inputText}>Submit</Text>
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
          setSuccess(false);
          navigation.dispatch(CommonActions.goBack());
        }}
      />
      <AwesomeAlert
        show={stockNotFound}
        showProgress={false}
        title="Gagal"
        message="Stock belum di setting, atur ke pengaturan?"
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ubah"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setStockNotFound(false);
          navigation.dispatch('Home');
        }}
      />
    </>
  );
};

export default StockInput;
