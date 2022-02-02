import React, {useState, useEffect} from 'react';
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
import {useTheme} from '@react-navigation/native';

const StockInput = () => {
  const theme = useTheme();
  const [stocks, setStock] = useState(['Susu 1kg', 'Susu 2,5kg', 'Sirup']);
  const [values, setValues] = useState([]);
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
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.textTitle, styles.inputText]}>
          Pemakaian Bahan Baku
        </Text>
        <View>
          {stocks.map((stock, i) => (
            <View key={i}>
              <View style={styles.listStock}>
                <Text style={{color: theme.colors.text}}>{stock}</Text>
                <View style={[styles.listStock, styles.inputAction]}>
                  <Pressable
                    onPress={() => {
                      let index = 1;
                      index = index + 1;
                      setValues((values[i] = index.toString()));
                    }}>
                    <Ionicons
                      size={25}
                      name="add-outline"
                      color={theme.colors.text}
                    />
                  </Pressable>
                  <TextInput
                    value={values[i] ? values[i] : '0'}
                    style={styles.inputText}
                  />
                  <Pressable>
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
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.inputText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default StockInput;
