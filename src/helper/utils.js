// import Intl from 'react-native-intl';
const convertPriceIDR = number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  }).format(number);
};

export {convertPriceIDR};
