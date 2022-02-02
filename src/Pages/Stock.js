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
    backgroundColor: 'blue',
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
    // borderRadius: '50%',
    position: 'absolute',
    bottom: '10%',
    left: '90%',
  },
});

const Stock = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStock}>
          <Text style={styles.headerText}>Total</Text>
          <Text style={styles.headerText}>Pemakaian</Text>
        </View>
        <ScrollView>
          <View style={styles.itemsStock}>
            <Text style={styles.textItemDate}>2020 22 200</Text>
            <View style={styles.itemStuff}>
              <View>
                <Text>20</Text>
                <Text>20</Text>
                <Text>20</Text>
              </View>
              <View>
                <Text>Susu</Text>
                <Text>Susu 2,2</Text>
                <Text>Sirup</Text>
              </View>
              <View>
                <Text>1</Text>
                <Text>2</Text>
                <Text>2</Text>
              </View>
            </View>
          </View>
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
