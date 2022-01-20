import firestore from '@react-native-firebase/firestore';
import {dateTodayMilisecond} from './helper/utils';
import moment from 'moment';

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

const historyTransactions = (filter = 'desc') => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = firestore()
        .collection('transactions')
        .orderBy('date', filter)
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

export {insertTransition, historyTransactions, getReportToday};
