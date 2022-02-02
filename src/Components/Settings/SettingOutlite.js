import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {
  getBranch,
  insertSettingOutlite,
  getSettingsOutlite,
} from '../../firebase';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

function SettingOutlite() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    titlePage: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
    },
    btnDropdown: {
      width: '100%',
      textAlign: 'left',
    },
    textTitle: {
      textAlignVertical: 'center',
      fontSize: 15,
      marginTop: 10,
    },
    submitBtn: {
      justifyContent: 'center',
      display: 'flex',
      backgroundColor: '#FF5DA2',
      marginTop: 10,
      borderRadius: 50,
    },
    pickerStyle: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginTop: 10,
      color: theme.colors.text,
    },
    noteStyle: {
      margin: 20,
    },
    textBtn: {
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 10,
      color: 'white',
    },
    disableBtn: {
      backgroundColor: 'grey',
      color: 'grey',
      opacity: '0.5',
    },
    marginBetween: {
      marginBottom: 10,
    },
  });

  const [branch, setBranch] = useState([]);
  const [openMoney, setOpenMoney] = useState('');
  const [cup, setCup] = useState('');
  const [plastik, setPlastik] = useState('');
  const [outliteBranch, setOutliteBranch] = useState('');

  useEffect(() => {
    getBranch()
      .then(result => {
        const temp = [];
        result.docs.map(doc => {
          temp.push({
            label: doc._data.branch_name,
            value: doc.id,
          });
        });
        setBranch(temp);
      })
      .catch(err => console.log(err));
    getSettings();
  }, [setBranch, setOutliteBranch]);

  const insertSettings = () => {
    const data = {
      branchId: outliteBranch,
      cup: cup,
      plastik: plastik,
      open_money: openMoney,
    };
    insertSettingOutlite(data);
    AsyncStorageLib.setItem('id', outliteBranch);
  };

  const getSettings = () => {
    AsyncStorageLib.getItem('id', async (err, result) => {
      if (err === null && result !== null) {
        const {_data, exists} = await getSettingsOutlite(result);
        if (exists) {
          setCup(_data.cup);
          setPlastik(_data.plastik);
          setOpenMoney(_data.open_money);
          setOutliteBranch(_data.branchId);
        }
      }
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.titlePage}>Pengaturan toko outlite</Text>
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Cup</Text>
          <TextInput
            style={styles.pickerStyle}
            value={cup}
            onChangeText={setCup}
          />
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Plastik</Text>
          <TextInput
            style={styles.pickerStyle}
            value={plastik}
            onChangeText={setPlastik}
          />
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Uang Buka</Text>
          <TextInput
            style={styles.pickerStyle}
            value={openMoney}
            onChangeText={setOpenMoney}
          />
        </View>
        <View style={styles.marginBetween}>
          <Text style={styles.textTitle}>Cabang Kota</Text>
          <RNPickerSelect
            style={{viewContainer: styles.pickerStyle}}
            items={branch}
            value={outliteBranch}
            onValueChange={value => {
              setOutliteBranch(value);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => insertSettings()}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

export default SettingOutlite;
