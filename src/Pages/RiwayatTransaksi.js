import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {historyTransactions} from '../firebase';
import {convertPriceIDR} from '../helper/utils';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const {width, height} = Dimensions.get('window');

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
    marginTop: 10,
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
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  moneyText: {
    textAlignVertical: 'center',
  },
  floatingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
  },
  floatingBtn: {
    backgroundColor: '#FF5DA2',
    height: 40,
    width: width / 2.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popUpSettings: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FF5DA2',
    padding: 10,
    height: height,
    // bottom: 0,
  },
  dotStripUp: {
    width: 100,
    height: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  containerFilter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  choseFilter: {
    width: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    height: 30,
  },
  textFilter: {
    alignItems: 'center',
    textAlignVertical: 'center',
    marginLeft: 30,
  },
  closeBtn: {
    color: 'black',
    alignSelf: 'center',
  },
  containerNotFound: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  textNotFound: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

function ItemHistory(items) {
  const momentDate = moment(items.data.timestamps).format('D, MMM YYYY HH:mm');
  return (
    <>
      <View style={styles.containerHistory}>
        <View style={styles.historyLeft}>
          {items.children}
          <View style={styles.containerTextTitles}>
            <Text style={[styles.title, {color: items.theme.colors.text}]}>
              {items.data.product}
            </Text>
            <Text style={[styles.dateTitles, {color: items.theme.colors.text}]}>
              {momentDate}
            </Text>
          </View>
        </View>
        <Text style={[styles.moneyText, {color: items.theme.colors.text}]}>
          {convertPriceIDR(items.data.totalPrices)}
        </Text>
      </View>
    </>
  );
}

class RiwayatTransaksi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: false,
      data: [],
      offset: new Animated.Value(900.0),
      value: 900,
      type: false,
    };
  }

  translateUp(typeSetting) {
    this.setState({
      value: typeSetting ? height / 2 : height / 4,
      type: typeSetting,
    });
    // Animated.timing(this.state.offset, {
    //   toValue: 470.0,
    //   duration: 0,
    //   easing: Easing.in(Easing.linear),
    //   useNativeDriver: true,
    //   isInteraction: true,
    // }).start(result => {
    //   console.log(result);
    // });
  }

  translateDown = () => {
    this.setState({value: 10000});
    Animated.timing(this.state.offset, {
      toValue: 900,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.in(Easing.linear),
    }).start();
  };

  btnSortReverse() {
    if (!this.state.filter) {
      const temp = this.state.data.reverse();
      this.setState({data: temp, filter: true});
    }
  }

  getHistoryTransactions() {
    historyTransactions()
      .then(value => {
        this.setState({data: value.docs, filter: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterWithDate(date) {
    console.log(date.dateString);
    historyTransactions(date.dateString)
      .then(value => {
        this.setState({data: value.docs, filter: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  btnSortNew() {
    if (this.state.filter) {
      const temp = this.state.data.reverse();
      this.setState({data: temp, filter: false});
    }
  }

  componentDidMount() {
    this.getHistoryTransactions();
  }

  RenderHistoryTransition({data, theme}) {
    if (data !== null) {
      return data.map((value, index) => {
        if (value._data.type === 'in') {
          return (
            <ItemHistory key={index} data={value._data} theme={theme}>
              <Image
                style={styles.images}
                source={require('../Assets/in-history.png')}
              />
            </ItemHistory>
          );
        } else if (value._data.type === 'out') {
          return (
            <ItemHistory key={index} data={value._data} theme={theme}>
              <Image
                style={styles.images}
                source={require('../Assets/out-history.png')}
              />
            </ItemHistory>
          );
        }
      });
    }
    return null;
  }

  filterNotFound() {
    if (this.state.data.length <= 0) {
      return (
        <>
          <View style={styles.containerNotFound}>
            <Text style={styles.textNotFound}>Data Tanggal tidak ada</Text>
          </View>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <this.RenderHistoryTransition
            data={this.state.data}
            theme={this.props.route.params.theme}
          />
          {this.filterNotFound()}
        </ScrollView>
        <View style={styles.floatingContainer}>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => {
              this.translateUp(false);
            }}>
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.translateUp(true);
            }}
            style={styles.floatingBtn}>
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.popUpSettings,
            {
              transform: [
                {
                  translateY: this.state.value,
                },
              ],
            },
          ]}>
          <View style={styles.dotStripUp} />
          {this.state.type ? (
            <View style={styles.container}>
              <TouchableOpacity
                style={[styles.containerFilter]}
                onPress={() => this.btnSortReverse()}>
                <View
                  style={[
                    styles.choseFilter,
                    {
                      backgroundColor: this.state.filter ? 'blue' : 'white',
                    },
                  ]}
                />
                <Text style={styles.textFilter}>Terlama</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerFilter}
                onPress={() => this.btnSortNew()}>
                <View
                  style={[
                    styles.choseFilter,
                    {
                      backgroundColor: this.state.filter ? 'white' : 'blue',
                    },
                  ]}
                />
                <Text style={styles.textFilter}>Terbaru</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Calendar onDayPress={this.filterWithDate.bind(this)} />
          )}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => this.translateDown()}>
            <Ionicons
              name={'close-circle'}
              size={50}
              color={this.props.route.params.theme.colors.background}
            />
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  }
}

export default RiwayatTransaksi;
