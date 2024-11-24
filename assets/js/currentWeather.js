import { getCorrectDate, getTime, getDuration } from './dates.js';
import { getWeatherData } from './weather.js';

export async function renderCurrentWeather(cityName) {
  const { current, timezone, timezone_offset } = await getWeatherData(cityName);
  const { dt, feels_like, sunrise, sunset, temp, weather } = current;
  const [{ main, icon }] = weather;

  const timeZoneEl = document.querySelector('#timeZone');
  const currentWeatherDate = document.querySelector('#currentDate');
  const sunriseEl = document.querySelector('#sunrise');
  const sunsetEl = document.querySelector('#sunset');
  const durationEl = document.querySelector('#duration');
  const currentWeatherDescriptionEl = document.querySelector('#currentWeatherDescription');
  const currentTempEl = document.querySelector('#currentTemp');
  const feelsLikeTempEl = document.querySelector('#feelsLike');
  const currentWeatherIconEl = document.querySelector('#currentWeatherIcon');

  timeZoneEl.textContent = timezone;
  currentWeatherDate.textContent = getCorrectDate(dt);
  sunriseEl.textContent = getTime(sunrise, timezone_offset);
  sunsetEl.textContent = getTime(sunset, timezone_offset);
  durationEl.textContent = getDuration(sunrise, sunset);
  currentWeatherIconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  currentWeatherDescriptionEl.textContent = main;
  currentTempEl.textContent = `${Math.round(temp)}°C`;
  feelsLikeTempEl.textContent = `Real Feel ${Math.round(feels_like)}°`;
}
