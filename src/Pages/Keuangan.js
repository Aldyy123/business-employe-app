import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getReportToday, getListAllReports} from '../firebase';
import {convertPriceIDR} from '../helper/utils';

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
      report: null,
      listReports: [],
    };
  }

  componentDidMount() {
    getReportToday()
      .then(report => {
        this.setState({report: report._data});
      })
      .catch(err => {
        console.log(err);
      });

    getListAllReports()
      .then(reports => {
        this.setState({listReports: reports});
      })
      .catch(err => console.log(err));
  }

  viewReportToday() {
    const {report} = this.state;
    // const report = this.reportData();
    // console.log(dateTodayMilisecond());
    // const apa = dateTodayMilisecond().toString().substring(5);
    // console.log(apa <= 54000000);
    // const iya = getYoutubeLikeToDisplay(apa);

    if (report) {
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
            {convertPriceIDR(report?.incomeMoney)}
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

  viewAllReports() {
    if (this.state?.listReports !== undefined) {
      return (
        <>
          {!this.state.listReports?.empty ? (
            this.state.listReports?._docs?.map(report => (
              <View style={styles.containerItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.textTitle}>Senin</Text>
                  <Text style={styles.textLitle}>40 Desember</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.textLitle}>Rp 4000</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>Gak ada</Text>
          )}
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.viewReportToday()}
        <ScrollView style={styles.container}>
          {this.viewAllReports()}
        </ScrollView>
      </>
    );
  }
}

export default Keuangan;
