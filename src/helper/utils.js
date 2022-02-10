const dateTodayMilisecond = () => {
  const secondsEpoch = new Date().getSeconds() * 1000;
  const minutesEpoch = new Date().getMinutes() * 60000;
  const hoursEpoch = new Date().getHours() * 3600000;
  const now = new Date().getTime() - hoursEpoch - minutesEpoch - secondsEpoch;
  return now;
};

const convertPriceIDR = number => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  }).format(number);
};

function getYoutubeLikeToDisplay(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = '';
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : '0' + hours;
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : '0' + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : '0' + seconds;
  if (hours !== '') {
    return hours + ':' + minutes + ':' + seconds;
  }
  return minutes + ':' + seconds;
}

const designData = (
  {income, date, timestamps, outcome, productOut, priceOut},
  {detailReport, state},
) => {
  let designObject;
  const incomeMoney = detailReport?._data?.incomeMoney
    ? detailReport._data.incomeMoney
    : 0;
  const outcomeMoney = detailReport?._data?.outcomeMoney
    ? detailReport._data.outcomeMoney
    : 0;
  const openMoney = detailReport?._data?.open_money
    ? detailReport._data.close_money
    : parseInt(state.settings.open_money);
  const closeMoney =
    openMoney +
    (income !== undefined ? income : 0) -
    (outcome !== undefined ? outcome : 0);

  if (detailReport.exists) {
    designObject = {
      open_money: parseInt(state.settings.open_money),
      close_money: closeMoney,
      incomeMoney: income !== undefined ? (income += incomeMoney) : incomeMoney,
      date,
      timestamps,
      priceOut:
        priceOut !== undefined
          ? [...detailReport?._data?.priceOut, ...priceOut]
          : detailReport?._data?.priceOut
          ? detailReport?._data?.priceOut
          : [],
      productOut:
        productOut !== undefined
          ? [...detailReport?._data?.productOut, ...productOut]
          : detailReport?._data?.productOut
          ? detailReport?._data?.productOut
          : [],
      outcomeMoney:
        outcome !== undefined ? (outcome += outcomeMoney) : outcomeMoney,
    };
  } else {
    designObject = {
      open_money: parseInt(state.settings.open_money),
      close_money: closeMoney,
      incomeMoney: income !== undefined ? (income += incomeMoney) : 0,
      date,
      timestamps,
      priceOut: priceOut !== undefined ? priceOut : [],
      productOut: productOut !== undefined ? productOut : [],
      outcomeMoney: outcome !== undefined ? (outcome += outcomeMoney) : 0,
    };
  }
  return designObject;
};

export {
  convertPriceIDR,
  dateTodayMilisecond,
  getYoutubeLikeToDisplay,
  designData,
};
