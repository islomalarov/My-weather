import { setIcons } from "./setIcons.js";
import { getWeak, getMonth } from "./dates.js";
import { getWeatherData } from "./weather.js";


export async function forecast(cityName) {
    const { daily } = await getWeatherData(cityName);

    const weatherDayTitle = document.querySelectorAll('.weather__5day-day');
    const weatherDate = document.querySelectorAll('.weather__5day-date');
    const weatherIcon = document.querySelectorAll('.weather__5day-icon');
    const weatherTemp = document.querySelectorAll('.weather__5day-temp');
    const weatherDescr = document.querySelectorAll('.weather__5day-descr');

    daily.forEach(({ dt, weather: [{ main }], temp: { day, night, max, min } }, index) => {
        if (index > 4) {
            index = 4;
        }
       
        weatherDayTitle[index].textContent = getWeak('short', dt);
        weatherDate[index].textContent = getMonth('short', dt);
        setIcons(main, weatherIcon[index]);
        weatherTemp[index].textContent = `${Math.round(day)}°/ ${Math.round(night)}°`;
        weatherDescr[index].textContent = main;
    });
}