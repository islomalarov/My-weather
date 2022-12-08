export function setIcons(main, elem) {
    switch (main) {
        case 'Thunderstorm': return elem.src = './assets/icons/storm-weather-1214555.svg';
        case 'Drizzle': return elem.src = './assets/icons/snowflake-1214542.svg';
        case 'Rain': return elem.src = './assets/icons/rain-1214541.svg';
        case 'Snow': return elem.src = './assets/icons/cold-temperature-1214536.svg';
        case 'Clear': return elem.src = './assets/icons/sunset-1215951.svg';
        case 'Clouds': return elem.src = './assets/icons/clouds-1214537.svg';
        case 'Mist': return elem.src = './assets/icons/water-1215948.svg';
    }
}