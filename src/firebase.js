import firestore from '@react-native-firebase/firestore';
import {dateTodayMilisecond} from './helper/utils';
import moment from 'moment';
const time = moment().format('YYYY-MM-DD');

const setReportFinance = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const report = await firestore()
        .collection('reports')
        .doc(time)
        .set(data);
      resolve(report);
    } catch (error) {
      reject(error);
    }
  });
};
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

const historyTransactions = (branch, filter = time) => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = firestore()
        .collection('transactions')
        .where('date', '==', filter)
        .where('branchId', '==', branch)
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
      const report = firestore().collection('reports').doc(time).get();
      resolve(report);
    } catch (error) {
      reject(error);
    }
  });
};

const getListAllReports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const reports = await firestore()
        .collection('reports')
        .where('date', '!=', time)
        .get();
      resolve(reports);
    } catch (error) {
      reject(error);
    }
  });
};

const repotDetails = (id = time) => {
  return new Promise(async (resolve, reject) => {
    try {
      const report = await firestore().collection('reports').doc(id).get();
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

const stock_usage = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const usageStock = await firestore()
        .collection('usage-stock')
        .doc(time)
        .set(data);
      resolve(usageStock);
    } catch (error) {
      reject(error);
    }
  });
};

const getStockUsage = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const usageStock = await firestore().collection('usage-stock').get();
      resolve(usageStock);
    } catch (error) {
      reject(error);
    }
  });
};

const setStocks = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const stocks = await firestore()
        .collection('stocks')
        .doc(data.branchId)
        .set(data);
      resolve(stocks);
    } catch (error) {
      reject(error);
    }
  });
};

const getStocksBranch = id => {
  return new Promise((resolve, reject) => {
    try {
      const stocks = firestore().collection('stocks').doc(id).get();
      resolve(stocks);
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
  setReportFinance,
  repotDetails,
  getListAllReports,
  stock_usage,
  setStocks,
  getStockUsage,
  getStocksBranch,
};
