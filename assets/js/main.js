import { tabs, addTable } from './tabs.js';
import { renderCurrentWeather } from "./currentWeather.js";
import { renderHourlyWeather } from "./hourlyWeather.js";
import { forecast } from "./forecast.js";
import { visible } from "./hidden.js";

tabs('#tabsContent', '.tabs__content-btn', '.weather__tabs', 'active');



renderCurrentWeather();
renderHourlyWeather('#todayHourly');
forecast();
addTable('#weather5day', '.weather__5day-forecast-days', 'active', '#forecastHourly');

const searchForm = document.forms.searchForm;
const cityInputEl = searchForm.cityInput;

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let cityName = cityInputEl.value;

    if (cityName) {
        visible();
        renderCurrentWeather(cityName);
        renderHourlyWeather('#todayHourly', cityName);
        forecast(cityName);
        addTable('#weather5day', '.weather__5day-forecast-days', 'active', '#forecastHourly', cityName);
    } else {
        alert('Введите название города');
    }
});

