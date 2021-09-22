import dailyforecast from "./daily-forecast";

const currentWeather = {
  async populateCurrentWeather(filteredData) {
    const data = filteredData.current;
    const currentWeatherEl = document.getElementById("current-weather");

    mainEl.classList.add("loading");
    currentWeatherEl.classList.contains("fade-in") ? currentWeatherEl.classList.add("fade-out") : null;
    
    await new Promise(resolve => setTimeout(resolve, 250));

    bodyEl.classList.remove("day");
    bodyEl.classList.remove("night");
    bodyEl.classList.remove("gray");

    for (const [key, value] of Object.entries(data)) {
      const currentSelector = key.replace("_", "-");
      const selectorString = `current-weather-${currentSelector}`;
      const currentEl = document.getElementById(selectorString);
      if (selectorString === "current-weather-icon") {
        const svgIcon = `../src/openweathermap/${value}.svg`;
        currentEl.src = svgIcon;
        if (value === "09d" || value === "10d" || value === "11d" || value === "13d" || value === "50d") {
          bodyEl.classList.add("day-gray");
        } else if (value === "09n" || value === "10n" || value === "11n" || value === "13n" || value === "50n") {
          bodyEl.classList.add("night-gray");
        } else if (value.includes("d")) {
          bodyEl.classList.add("day");
        } else if (value.includes("n")) {
          bodyEl.classList.add("night");
        }
      } else if (selectorString === "current-weather-state") {
        currentEl.textContent = `, ${value}`;
      } else if (selectorString === "current-weather-temp" || selectorString === "current-weather-feels-like") {
        tempUnitCheckbox.checked ? currentEl.textContent = `${this.convertToFarenheit(value)}\xB0 F` : currentEl.textContent = `${this.convertToCelcius(value)}\xB0 C`;
      } else if (selectorString === "current-weather-wind-speed") {
        currentEl.textContent = `${value}mph`;
      } else if (selectorString === "current-weather-sunrise" || selectorString === "current-weather-sunset") {
        const unixTimestamp = value;
        const localizedTime = new Date(unixTimestamp * 1000).toLocaleTimeString('en-US', { timeZone: data.timezone });
        currentEl.textContent = localizedTime;
      } else if (selectorString === "current-weather-clouds" || selectorString === "current-weather-humidity" ) {
        currentEl.textContent = `${value}%`;
      } else if (selectorString === "current-weather-pressure") {
        currentEl.textContent = `${value}hPa`;
      } else if (selectorString === "current-weather-visibility") {
        currentEl.textContent = `${(value * 0.001).toFixed(1)}km`;
      } else {
        selectorString !== "current-weather-timezone" ? currentEl.textContent = value : null;
      }
    }

    if (!Object.prototype.hasOwnProperty.call(data, "state")) {
      document.getElementById("current-weather-state").textContent = "";
    }

    dailyforecast.populateForecast(filteredData);

    !currentWeatherEl.classList.contains("fade-in") ? currentWeatherEl.classList.add("fade-in") : null;
    resultsEl.classList.contains("fade-in") ? resultsEl.classList.remove("fade-in") : null;
    await new Promise(resolve => setTimeout(resolve, 750));
    currentWeatherEl.classList.remove("fade-out");
    mainEl.classList.remove("loading");
  },
  convertToFarenheit(temp) {
    return Math.round((temp - 273.15) * 9/5 + 32);
  },
  convertToCelcius(temp) {
    return Math.round(temp - 273.15);
  },
  convertToFarFromCel(temp) {
    return Math.round((temp * 9/5) + 32);
  },
  convertToCelFromFar(temp) {
    return Math.round((temp - 32) * 5/9);
  },
  convertTemps(arrayOfElements) {
    for (let i = 0; i < arrayOfElements.length; i++) {
      const currentEl = document.getElementById(arrayOfElements[i]);
      if (currentEl && currentEl.textContent!== null) {
        const splitContent = currentEl.textContent.split("°")[0];
        tempUnitCheckbox.checked ? currentEl.textContent = `${currentWeather.convertToFarFromCel(splitContent)}\xB0 F` : currentEl.textContent = `${currentWeather.convertToCelFromFar(splitContent)}\xB0 C`;
      }
    }
  }
}

const bodyEl = document.getElementById("body");
const mainEl = document.getElementById("main");
const resultsEl = document.getElementById("results");
const tempUnitCheckbox = document.getElementById("temp-unit-checkbox");

export default currentWeather;
