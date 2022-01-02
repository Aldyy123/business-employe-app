import React from 'react';
import {View, StyleSheet, Text, Image, Button, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 13,
  },
  containerHistory: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    flexDirection: 'row',
  },
  historyLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  containerTextTitles: {
    marginLeft: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateTitles: {
    fontSize: 12,
  },
  images: {
    height: 43,
  },
  moneyText: {
    textAlignVertical: 'center',
  },
});

class RiwayatTransaksi extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.containerHistory}>
            <View style={styles.historyLeft}>
              <Image
                style={styles.images}
                source={require('../Assets/out-history.png')}
              />
              <View style={styles.containerTextTitles}>
                <Text style={styles.title}>Galon</Text>
                <Text style={styles.dateTitles}>30 desember</Text>
              </View>
            </View>
            <Text style={styles.moneyText}>Rp -20000</Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default RiwayatTransaksi;
