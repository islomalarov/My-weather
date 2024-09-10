import { getWeak, getMonth } from './dates.js';
import { getWeatherData } from './weather.js';

export async function forecast(cityName) {
  const { daily } = await getWeatherData(cityName);
  const block = document.querySelector('#weather5day');
  block.innerHTML = '';

  daily.slice(0, 5).forEach((elem) => {
    const {
      dt,
      weather: [{ main, icon }],
      temp: { day, night },
    } = elem;

    const div = document.createElement('div');
    div.className = 'weather__5day-forecast-days';
    const weatherDayTitle = document.createElement('h3');
    weatherDayTitle.className = 'weather__5day-day title';
    const weatherDate = document.createElement('span');
    weatherDate.className = 'weather__5day-date';
    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather__5day-icon';
    const weatherTemp = document.createElement('span');
    weatherTemp.className = 'weather__5day-temp';
    const weatherDescr = document.createElement('span');
    weatherDescr.className = 'weather__5day-descr';

    weatherDayTitle.textContent = getWeak('short', dt);
    weatherDate.textContent = getMonth('short', dt);
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherTemp.textContent = `${Math.round(day)}°/ ${Math.round(night)}°`;
    weatherDescr.textContent = main;
    div.append(weatherDayTitle, weatherDate, weatherIcon, weatherTemp, weatherDescr);
    block.append(div);
  });
}
