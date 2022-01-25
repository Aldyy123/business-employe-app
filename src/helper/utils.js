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

export {convertPriceIDR, dateTodayMilisecond, getYoutubeLikeToDisplay};
