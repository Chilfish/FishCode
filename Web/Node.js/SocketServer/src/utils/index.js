function fillZero(x) {
  x = `${x}`;
  return x.length === 1 ? `0${x}` : x;
}

export function parseDate(time) {
  if (typeof time === 'string') {
    time = new Date(time);
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = `${time.getFullYear()}`,
    month = fillZero(time.getMonth() + 1),
    date = fillZero(time.getDate()),
    hours = fillZero(time.getHours()),
    minutes = fillZero(time.getMinutes()),
    seconds = fillZero(time.getSeconds()),
    day = days.at(time.getDay());

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    day,
    shortTime: `${hours}:${minutes}`,
    full: `${year}/${month}/${date} ${hours}:${minutes}:${seconds} ${day}`,
  };
}
