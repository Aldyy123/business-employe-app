import firestore from '@react-native-firebase/firestore';
const time = new Date().getMilliseconds();

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

export {insertTransition};
