import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {convertPriceIDR} from '../../helper/utils';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 30,
    margin: 10,
  },
  detailList: {
    justifyContent: 'space-between',
    display: 'flex',
    padding: 3,
    alignContent: 'center',
    flexDirection: 'row',
    textAlignVertical: 'middle',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
});

class DetailReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataMoney: null,
    };
  }

  componentDidMount() {
    this.setState({dataMoney: this.props.route.params.report});
  }

  pengeluaranBarang() {
    const component = [];
    if (this.state.dataMoney !== null) {
      for (let i = 0; i < this.state.dataMoney.productOut.length; i++) {
        component.push(
          <View style={styles.detailList} key={i}>
            <Text>{this.state.dataMoney.productOut[i]}</Text>
            <Text>
              {this.state.dataMoney !== null
                ? convertPriceIDR(this.state.dataMoney?.priceOut[i])
                : convertPriceIDR(0)}
            </Text>
          </View>,
        );
      }
      return component;
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Pagi</Text>
          <View>
            <View style={styles.detailList}>
              <Text>Penghasilan: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney?.incomeMoney)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text>Uang Keluar: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney?.outcomeMoney)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text>Uang Buka: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney?.open_money)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={[styles.detailList, {marginBottom: 10}]}>
              <Text>Uang Tutup: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney?.close_money)
                  : 0}
              </Text>
            </View>
            <View>{this.pengeluaranBarang()}</View>
          </View>
        </View>
      </>
    );
  }
}

export default DetailReport;
