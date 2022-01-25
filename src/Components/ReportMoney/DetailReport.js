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
      for (let i = 0; i < this.state.dataMoney[0].products.length; i++) {
        component.push(
          <View style={styles.detailList} key={i}>
            <Text>{this.state.dataMoney[0].products[i].product}</Text>
            <Text>
              {this.state.dataMoney !== null
                ? convertPriceIDR(
                    this.state.dataMoney[0]?.products[i].price *
                      this.state.dataMoney[0]?.products[i].qty,
                  )
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
                  ? convertPriceIDR(this.state.dataMoney[0]?.moneyIn)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text>Uang Keluar: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney[0]?.moneyOut)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={styles.detailList}>
              <Text>Uang Buka: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(this.state.dataMoney[0]?.openMoney)
                  : convertPriceIDR(0)}
              </Text>
            </View>
            <View style={[styles.detailList, {marginBottom: 10}]}>
              <Text>Uang Tutup: </Text>
              <Text>
                {this.state.dataMoney !== null
                  ? convertPriceIDR(
                      this.state.dataMoney[0]?.moneyIn +
                        this.state.dataMoney[0]?.openMoney,
                    )
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
