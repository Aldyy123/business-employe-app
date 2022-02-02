import firestore from '@react-native-firebase/firestore';
import {dateTodayMilisecond} from './helper/utils';
import moment from 'moment';
const time = moment().format('YYYY-MM-DD');

const insertTransition = data => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = firestore().collection('transactions').add(data);
      resolve(transactions);
    } catch (error) {
      reject(error);
    }
  });
};

const historyTransactions = (filter = time) => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = firestore()
        .collection('transactions')
        .where('date', '==', filter)
        .get();
      resolve(transactions);
    } catch (error) {
      reject(error);
    }
  });
};

const getReportToday = () => {
  return new Promise((resolve, reject) => {
    try {
      const report = firestore()
        .collection('transactions')
        .where('date', '>=', dateTodayMilisecond())
        .get();
      resolve(report);
    } catch (error) {
      reject(error);
    }
  });
};

const insertSettingOutlite = data => {
  return new Promise((resolve, reject) => {
    const outline = firestore()
      .collection('settings')
      .doc(data.branchId)
      .set(data);
    resolve(outline);
    try {
    } catch (error) {
      reject(error);
    }
  });
};

const getSettingsOutlite = id => {
  return new Promise((resolve, reject) => {
    try {
      const getSettings = firestore().collection('settings').doc(id).get();
      resolve(getSettings);
    } catch (error) {
      reject(error);
    }
  });
};

const getBranch = () => {
  return new Promise((resolve, reject) => {
    try {
      const branch = firestore().collection('branch').get();
      resolve(branch);
    } catch (error) {
      reject(error);
    }
  });
};

const loginEmploye = (id, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const employe = await firestore().collection('employer').doc(id).get();
      if (employe.exists && employe._data.password === password) {
        resolve({id: employe.id, data: employe._data, found: true});
      } else {
        resolve({found: false});
      }
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertTransition,
  historyTransactions,
  getReportToday,
  getBranch,
  insertSettingOutlite,
  getSettingsOutlite,
  loginEmploye,
};
