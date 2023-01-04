function fillZero(x) {
  x = `${x}`;
  return x.length === 1 ? `0${x}` : x;
}

export function parseDate(time = new Date()) {
  if (typeof time === 'string') {
    time = new Date(time.substring(0, 19));
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = `${time.getFullYear()}`,
    month = fillZero(time.getMonth() + 1),
    date = fillZero(time.getDate()),
    hours = fillZero(time.getHours()),
    minutes = fillZero(time.getMinutes()),
    seconds = fillZero(time.getSeconds()),
    day = days.at(time.getDay());

  const shortDate = `${month}/${date}`,
    longDate = `${year}/${shortDate}`,
    shortTime = `${hours}:${minutes}`,
    longTime = `${shortTime}:${seconds}`,
    fullTime = `${longDate} ${longTime}`,
    fullDate = `${fullTime} ${day}`;

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    day,

    shortDate,
    shortTime,
    longDate,
    longTime,
    fullDate,
    fullTime,
  };
}
