import { renderHourlyWeather } from './hourlyWeather.js';

export const tabs = (tabs, headingItem, contentItem, className) => {
  const tabsElem = document.querySelector(tabs);
  const headingItems = document.querySelectorAll(headingItem);
  const contentItems = document.querySelectorAll(contentItem);

  addClass(headingItems, className);
  addClass(contentItems, className);

  tabsElem.addEventListener('click', (e) => {
    headingItems.forEach((elem, index) => {
      if (e.target === elem) {
        removeClass(headingItems, className);
        removeClass(contentItems, className);

        addClass(headingItems, className, index);
        addClass(contentItems, className, index);
      }
    });
  });
};

export const addTable = (tabs, headingItem, className, block, cityName) => {
  const tabsElem = document.querySelector(tabs);
  const headingItems = document.querySelectorAll(headingItem);
  removeClass(headingItems, className);
  addClass(headingItems, className);
  renderHourlyWeather(block, cityName);

  tabsElem.addEventListener('click', (e) => {
    headingItems.forEach((elem, index) => {
      if (e.target.closest('.weather__5day-forecast-days') === elem) {
        removeClass(headingItems, className);
        addClass(headingItems, className, index);
        renderHourlyWeather(block, cityName, index);
      }
    });
  });
};

const removeClass = (items, className) => {
  items.forEach((elem) => {
    elem.classList.remove(className);
  });
};

const addClass = (items, className, index = 0) => {
  items[index].classList.add(className);
};
