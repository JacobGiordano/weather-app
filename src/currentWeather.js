const currentWeather = {
  async populateCurrentWeather(filteredData) {
    const data = filteredData.current;
    const currentWeatherEl = document.getElementById("current-weather");

    mainEl.classList.add("loading");
    currentWeatherEl.classList.contains("fade-in") ? currentWeatherEl.classList.add("fade-out") : null;
    
    await new Promise(resolve => setTimeout(resolve, 250));
    currentWeatherEl.classList.remove("day");
    currentWeatherEl.classList.remove("night");
    currentWeatherEl.classList.remove("gray");
    // currentWeatherEl.classList.remove("fade-in");

    for (const [key, value] of Object.entries(data)) {
      const currentSelector = key.replace("_", "-");
      const selectorString = `current-weather-${currentSelector}`;
      const currentEl = document.getElementById(selectorString);
      console.log(value);
      if (selectorString === "current-weather-icon") {
        const svgIcon = `../src/openweathermap/${value}.svg`;
        currentEl.src = svgIcon;
        value.includes("d") ? currentweather.classList.add("day") : currentweather.classList.add("night");
      } else if (selectorString === "current-weather-state") {
        currentEl.textContent = `, ${value}`;
      } else if (selectorString === "current-weather-temp" || selectorString === "current-weather-feels-like") {
        tempUnitCheckbox.checked ? currentEl.textContent = `${this.convertToFarenheit(value)}\xB0 F` : currentEl.textContent = `${this.convertToCelcius(value)}\xB0 C`;
      }else {
        currentEl.textContent = value;
      }
    }

    if (!Object.prototype.hasOwnProperty.call(data, "state")) {
      document.getElementById("current-weather-state").textContent = "";
    }

    !currentWeatherEl.classList.contains("fade-in") ? currentWeatherEl.classList.add("fade-in") : null;
    resultsWrapper.classList.contains("fade-in") ? resultsWrapper.classList.remove("fade-in") : null;
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
        console.log(currentEl.id);
        const splitContent = currentEl.textContent.split("°")[0];
        tempUnitCheckbox.checked ? currentEl.textContent = `${currentWeather.convertToFarFromCel(splitContent)}\xB0 F` : currentEl.textContent = `${currentWeather.convertToCelFromFar(splitContent)}\xB0 C`;
        console.log(splitContent);
      }
    }
  }
}

const mainEl = document.getElementById("main");
const currentweather = document.getElementById("current-weather");
const resultsWrapper = document.getElementById("results-wrapper");
const tempUnitCheckbox = document.getElementById("temp-unit-checkbox");

export default currentWeather;

// City name, State name (if applicable)
// Country name
// Icon w/ Current temp overlaid
// Description and/or Main info
// Feels like temp / Humidity
// Pressure / Wind speed
// Clouds / Visibility
// Sunrise / Sunset
