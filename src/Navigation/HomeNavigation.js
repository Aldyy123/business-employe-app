import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Transaksi from '../Pages/Transaksi';
import Home from '../Pages/Home';
import RiwayatTransaksi from '../Pages/RiwayatTransaksi';
import Keuangan from '../Pages/Keuangan';
import DetailReport from '../Components/ReportMoney/DetailReport';
import Stocks from '../Pages/Stock';
import StockInput from '../Components/Stock/StockInput';
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="History" component={RiwayatTransaksi} />
        <Stack.Screen name="Keuangan" component={Keuangan} />
        <Stack.Screen name="DetailReport" component={DetailReport} />
        <Stack.Screen name="Stock" component={Stocks} />
        <Stack.Screen name="StockInput" component={StockInput} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigation;
