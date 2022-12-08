import { getForecastData } from "./weather.js";
import { timeConvert, getWeak } from "./dates.js";
import { setIcons } from "./setIcons.js";


export async function renderHourlyWeather(block, cityName, index = 0) {
    // console.log(await cityName);
    const forecast = await parseList(cityName);
    // console.log(forecast);
    const [{ dt }] = forecast[index];

    const tableAddBlock = document.querySelector(block);

    if (tableAddBlock.lastElementChild.tagName !== 'H3') {
        tableAddBlock.lastElementChild.remove();
    }

    const weatherHourlyTable = document.createElement('table');

    const hourlyTableHeadTr = document.createElement('tr');
    const hourlyTableMainTr = document.createElement('tr');
    const hourlyTableForecastTr = document.createElement('tr');
    const hourlyTableTempTr = document.createElement('tr');
    const hourlyTableRealFeelTr = document.createElement('tr');
    const hourlyTableWindTr = document.createElement('tr');

    const hourlyTableHeadTh = document.createElement('th');
    const hourlyTableMainTh = document.createElement('th');
    const hourlyTableForecastTh = document.createElement('th');
    const hourlyTableTempTh = document.createElement('th');
    const hourlyTableRealFeelTh = document.createElement('th');
    const hourlyTableWindTh = document.createElement('th');

    hourlyTableHeadTh.textContent = getWeak('long', dt);
    hourlyTableForecastTh.textContent = 'Forecast';
    hourlyTableTempTh.textContent = 'Temp (°C)';
    hourlyTableRealFeelTh.textContent = 'RealFeel';
    hourlyTableWindTh.textContent = 'Wind (km/h)';

    hourlyTableHeadTr.append(hourlyTableHeadTh);
    hourlyTableMainTr.append(hourlyTableMainTh);
    hourlyTableForecastTr.append(hourlyTableForecastTh);
    hourlyTableTempTr.append(hourlyTableTempTh);
    hourlyTableRealFeelTr.append(hourlyTableRealFeelTh);
    hourlyTableWindTr.append(hourlyTableWindTh);

    for (let { dt, main: { temp, feels_like }, weather: [{ main }], wind: { speed } } of forecast[index]) {
        const hourlyTableHeadTd = document.createElement('td');
        const hourlyTableMainTd = document.createElement('td');
        const hourlyTableMainIcon = document.createElement('img');
        const hourlyTableForecastTd = document.createElement('td');
        const hourlyTableTempTd = document.createElement('td');
        const hourlyTableRealFeelTd = document.createElement('td');
        const hourlyTableWindTd = document.createElement('td');

        hourlyTableHeadTd.textContent = timeConvert(dt);
        setIcons(main, hourlyTableMainIcon);
        hourlyTableMainTd.append(hourlyTableMainIcon);
        hourlyTableForecastTd.textContent = main;
        hourlyTableTempTd.textContent = `${Math.round(temp)}°`;
        hourlyTableRealFeelTd.textContent = `${Math.round(feels_like)}°`;
        hourlyTableWindTd.textContent = `${Math.round(speed)} ESE`

        hourlyTableHeadTr.append(hourlyTableHeadTd);
        hourlyTableMainTr.append(hourlyTableMainTd);
        hourlyTableForecastTr.append(hourlyTableForecastTd);
        hourlyTableRealFeelTr.append(hourlyTableTempTd);
        hourlyTableTempTr.append(hourlyTableRealFeelTd);
        hourlyTableWindTr.append(hourlyTableWindTd)
    }

    weatherHourlyTable.append(hourlyTableHeadTr, hourlyTableMainTr, hourlyTableForecastTr, hourlyTableTempTr, hourlyTableRealFeelTr, hourlyTableWindTr);
    tableAddBlock.append(weatherHourlyTable);
}


async function parseList(cityName) {
    const { list } = await getForecastData(cityName);
    const newList = [];

    for (let i = 0; i < list.length; i += 8) {
        newList.push(list.slice(i, i + 8))
    }
    return newList;
}