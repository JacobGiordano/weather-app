import currentWeather from "./currentWeather";
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

const dailyforecast = {
  populateForecast(filteredData) {
    const data = filteredData;
    const forecastData = data.forecast;
    const forecastEls = document.querySelectorAll(".daily-forecast__row");

    for (let i = 0; i < forecastEls.length; i++) {
      let currentEL = forecastEls[i];
      const forecastDate = new Date();
      const svgIcon = `../src/openweathermap/${forecastData[i].icon}.svg`;
      
      currentEL.querySelector(".daily-forecast__date").textContent = format(addDays(forecastDate, i + 1), "eee, MMM d");
      currentEL.querySelector(".daily-forecast__icon").src = svgIcon;
      if (tempUnitCheckbox.checked) {
        currentEL.querySelector(".daily-forecast__high").textContent = `${currentWeather.convertToFarenheit(forecastData[i].high_temp)}\xB0 F`;
        currentEL.querySelector(".daily-forecast__low").textContent = `${currentWeather.convertToFarenheit(forecastData[i].low_temp)}\xB0 F`;
      } else {
        currentEL.querySelector(".daily-forecast__high").textContent = `${currentWeather.convertToCelcius(forecastData[i].high_temp)}\xB0 C`;
        currentEL.querySelector(".daily-forecast__low").textContent = `${currentWeather.convertToCelcius(forecastData[i].low_temp)}\xB0 C`;
      }
    }
  }
}

const tempUnitCheckbox = document.getElementById("temp-unit-checkbox");

export default dailyforecast;