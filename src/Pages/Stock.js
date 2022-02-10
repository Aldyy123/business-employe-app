import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {getStockUsage} from '../firebase';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: height,
  },
  headerStock: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemsStock: {
    backgroundColor: '#92A9BD',
    padding: 10,
    margin: 5,
  },
  textItemDate: {
    textAlign: 'center',
    marginBottom: 10,
  },
  itemStuff: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  floatingActionBtn: {
    borderRadius: '50%',
    position: 'absolute',
    bottom: '10%',
    left: '90%',
  },
  textWhite: {
    color: 'white',
  },
});

const Stock = () => {
  const navigation = useNavigation();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    getStockUsage()
      .then(stoks => setStocks(stoks))
      .catch(err => console.log(err));
  }, []);
  console.log(stocks);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStock}>
          <Text style={styles.headerText}>Total</Text>
          <Text style={styles.headerText}>Pemakaian</Text>
        </View>
        <ScrollView>
          {!stocks?.empty
            ? stocks?._docs?.map(stock => (
                <View style={styles.itemsStock} key={stock._data.stock_id}>
                  <Text style={styles.textItemDate}>{stock._data.date}</Text>
                  <View style={styles.itemStuff}>
                    <View>
                      <Text style={styles.textWhite}>{stock._data.sirup}</Text>
                      <Text style={styles.textWhite}>20</Text>
                      <Text style={styles.textWhite}>20</Text>
                    </View>
                    <View>
                      <Text style={styles.textWhite}>Susu 1kg</Text>
                      <Text style={styles.textWhite}>Susu 2,5kg</Text>
                      <Text style={styles.textWhite}>Sirup</Text>
                    </View>
                    <View>
                      <Text style={styles.textWhite}>
                        {stock._data.susu_kecil}
                      </Text>
                      <Text style={styles.textWhite}>
                        {stock._data.susu_besar}
                      </Text>
                      <Text style={styles.textWhite}>{stock._data.sirup}</Text>
                    </View>
                  </View>
                </View>
              ))
            : null}
        </ScrollView>
        <TouchableOpacity
          style={styles.floatingActionBtn}
          onPress={() => navigation.navigate('StockInput')}>
          <Ionicons name="add-circle" size={60} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Stock;
