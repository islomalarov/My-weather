import { hidden } from "./hidden.js";

const API_KEY = '69151ddc14e90d97cd654a5d8d86eab1';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        return e;
    }
}

async function getLocation(cityName) {
    const [geoData] = await fetchData(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
    return geoData;
}

async function getCurrentLocation() {
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(location => {
            resolve(location.coords);
        });
    });
}

export async function getWeatherData(cityName) {
    try {
        if (cityName) {
            const { lat, lon } = await getLocation(cityName);
            return await fetchData(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`);
        } else {
            const { latitude: lat, longitude: lon } = await getCurrentLocation();
            return await fetchData(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`);
        }
    } catch (error) {
        hidden(cityName);
    }
}


export async function getForecastData(cityName) {
    if (cityName) {
        const { lat, lon } = await getLocation(cityName);
        return await fetchData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    } else {
        const { latitude: lat, longitude: lon } = await getCurrentLocation();
        return await fetchData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    }
}