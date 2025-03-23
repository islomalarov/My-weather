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

    const weatherDays = document.createElement('div');
    const weatherDayTitle = document.createElement('h3');
    const weatherDate = document.createElement('span');
    const weatherIcon = document.createElement('img');
    const weatherTemp = document.createElement('span');
    const weatherDescription = document.createElement('span');

    weatherDays.className = 'weather__5day-forecast-days';
    weatherDayTitle.className = 'weather__5day-day title';
    weatherDate.className = 'weather__5day-date';
    weatherIcon.className = 'weather__5day-icon';
    weatherTemp.className = 'weather__5day-temp';
    weatherDescription.className = 'weather__5day-description';

    weatherDayTitle.textContent = getWeak('short', dt);
    weatherDate.textContent = getMonth('short', dt);
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherTemp.textContent = `${Math.round(day)}°/ ${Math.round(night)}°`;
    weatherDescription.textContent = main;
    weatherDays.append(weatherDayTitle, weatherDate, weatherIcon, weatherTemp, weatherDescription);
    block.append(weatherDays);
  });
}
