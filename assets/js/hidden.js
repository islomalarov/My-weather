export function hidden(cityName) {
    const weather = document.querySelector('.weather__content');
    weather.style.display = 'none';
    const errorBlock = document.querySelector('.error');
    errorBlock.style.display = 'flex';
    const errorName = document.querySelector('#errorName');
    errorName.textContent = cityName;
    
}

export function visible() {
    const weather = document.querySelector('.weather__content');
    weather.style.display = 'block';
    const errorBlock = document.querySelector('.error');
    errorBlock.style.display = 'none';
}