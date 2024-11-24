export function getCorrectDate(dt) {
  dt = new Date(dt * 1000);
  let d = dt.getDate();
  let m = dt.getMonth() + 1;
  let y = dt.getFullYear();

  return `${d}.${m <= 9 ? '0' + m : m}.${y}`;
}

export function getTime(times, timezoneOffset) {
  let localTime = new Date(times * 1000).getTimezoneOffset();
  times = times - (-localTime * 60 - timezoneOffset);

  return timeConvert(times, 'numeric');
}

export function getDuration(sunrise, sunset) {
  let duration = sunset - sunrise;
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration - 3600 * hours) / 60);

  return `${hours <= 9 ? '0' + hours : hours}:${minutes <= 9 ? '0' + minutes : minutes} hr`;
}

export function getWeak(length, dt) {
  let weak;
  let currentHours = new Date().getHours();
  let currentDate = new Date().getDate();
  let changeDate = new Date(dt * 1000).getDate();

  if (currentDate === changeDate && (currentHours >= 22 || currentHours <= 6)) {
    weak = 'TONIGHT';
  } else if (currentDate === changeDate) {
    weak = 'TODAY';
  } else {
    weak = new Intl.DateTimeFormat('en-US', { weekday: length })
      .format(new Date(dt * 1000))
      .toUpperCase();
  }
  return weak;
}

export function getMonth(length, dt) {
  let month = new Intl.DateTimeFormat('en-US', { month: length, day: 'numeric' }).format(
    new Date(dt * 1000),
  );

  return month;
}

export function timeConvert(dt, minute) {
  if (minute) {
    return new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: minute }).format(
      new Date(dt * 1000),
    );
  }

  return new Intl.DateTimeFormat('en-AU', { hour: 'numeric' }).format(new Date(dt * 1000));
}
