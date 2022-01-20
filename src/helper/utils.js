import moment from 'moment';

const dateTodayMilisecond = () => {
  const secondsEpoch = new Date().getSeconds() * 1000;
  const minutesEpoch = new Date().getMinutes() * 60000;
  const hoursEpoch = new Date().getHours() * 3600000;
  const now = new Date().getTime() - hoursEpoch - minutesEpoch - secondsEpoch;
  return now;
};

const startDateToday = () => {
  return new Date(moment().format('YYYY-MM-DD')).valueOf();
};

const convertPriceIDR = number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  }).format(number);
};

export {convertPriceIDR, dateTodayMilisecond, startDateToday};
