import { tabs, addTable } from './tabs.js';
import { renderCurrentWeather } from './currentWeather.js';
import { renderHourlyWeather } from './hourlyWeather.js';
import { forecast } from './forecast.js';
import { visible } from './hidden.js';
const searchForm = document.forms.searchForm;
const cityInputEl = searchForm.cityInput;

tabs('#tabsContent', '.tabs__content-btn', '.weather__tabs', 'active');
await renderCurrentWeather();
await renderHourlyWeather('#todayHourly');
await forecast();
addTable('#weather5day', '.weather__5day-forecast-days', 'active', '#forecastHourly');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let cityName = cityInputEl.value;

  if (cityName) {
    visible();
    await renderCurrentWeather(cityName);
    await renderHourlyWeather('#todayHourly', cityName);
    await forecast(cityName);
    addTable('#weather5day', '.weather__5day-forecast-days', 'active', '#forecastHourly', cityName);
  } else {
    alert('Enter the city name');
  }
});
