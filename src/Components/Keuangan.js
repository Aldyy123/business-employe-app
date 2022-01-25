import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {dateTodayMilisecond, getYoutubeLikeToDisplay} from '../helper/utils';
import {getReportToday} from '../firebase';
import {convertPriceIDR} from '../helper/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FF5DA2',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemLeft: {
    display: 'flex',
  },
  itemRight: {
    alignSelf: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  textLitle: {
    fontSize: 12,
    marginTop: 5,
  },
  reportToday: {
    borderRadius: 1000,
    width: width / 2.3,
    backgroundColor: '#D148C4',
    height: height / 5,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  titleToday: {
    textAlign: 'center',
    margin: 25,
    fontSize: 19,
  },
  textPriceToday: {
    fontSize: 15,
    textAlign: 'center',
    margin: 25,
  },
});

class Keuangan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataServe: [],
      quickReport: null,
    };
  }

  componentDidMount() {
    getReportToday()
      .then(report => {
        this.setState({dataServe: [...report.docs]});
      })
      .catch(err => {
        console.log(err);
      });
  }

  async componentDidUpdate() {
    await this.insertLocalStorage();
  }

  reportData() {
    let dataMorning = null,
      dataEvening = null,
      totalIn = 0,
      totalOut = 0;
    const now = new Date().getTime();
    const product = [];

    this.state.dataServe.map((value, key) => {
      if (value._data.type === 'out') {
        product.push({
          product: value._data.product,
          price: value._data.price,
          qty: value._data.qty,
        });
        totalOut += value._data.totalPrices;
      } else {
        totalIn += value._data.totalPrices;
      }
      if (new Date().getHours() >= 15) {
        dataEvening = {
          moneyOut: totalOut,
          moneyIn: totalIn,
          date: now,
          products: product,
          openMoney: 150000,
        };
      } else {
        dataMorning = {
          moneyOut: totalOut,
          moneyIn: totalIn,
          date: now,
          products: product,
          openMoney: 150000,
        };
      }
    });
    const quickReport = [dataMorning, dataEvening];
    return quickReport;
  }

  async insertLocalStorage() {
    try {
      const report = this.reportData();
      const storage = JSON.parse(await AsyncStorage.getItem('today'));
      console.log(storage);
      if (!storage) {
        if (storage[0].date <= dateTodayMilisecond()) {
          console.log(storage);
        } else {
          if (report !== null)
            await AsyncStorage.setItem('today', JSON.stringify(report));
        }
      } else {
        if (report !== null)
          await AsyncStorage.setItem('today', JSON.stringify(report));
      }
    } catch (error) {
      console.log(error);
    }
  }

  viewReportToday() {
    const report = this.reportData();
    // console.log(dateTodayMilisecond());
    // const apa = dateTodayMilisecond().toString().substring(5);
    // console.log(apa <= 54000000);
    // const iya = getYoutubeLikeToDisplay(apa);
    // console.log(iya);

    if (report[0] !== null) {
      return (
        <TouchableOpacity
          style={styles.reportToday}
          onPress={() =>
            this.props.navigation.navigate('DetailReport', {
              report,
            })
          }>
          <Text style={[styles.titleToday, styles.textTitle]}>Hari ini</Text>
          <Text style={[styles.textPriceToday]}>
            {convertPriceIDR(report[0].moneyIn)}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.reportToday}>
        <Text style={[styles.titleToday, styles.textTitle]}>Hari ini</Text>
        <Text style={[styles.textPriceToday]}>Belum melayani</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <>
        {this.viewReportToday()}
        <ScrollView style={styles.container}>
          <View style={styles.containerItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.textTitle}>Senin</Text>
              <Text style={styles.textLitle}>40 Desember</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.textLitle}>Rp 4000</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default Keuangan;
