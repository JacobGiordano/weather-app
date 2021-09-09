import ui from "./ui.js";

const currentWeather = {
  async populateCurrentWeather(filteredData) {
    const data = filteredData.current;
    const currentWeatherEl = document.getElementById("current-weather");

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
      } else {
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
  }
}

const currentweather = document.getElementById("current-weather");
const resultsWrapper = document.getElementById("results-wrapper");

export default currentWeather;

// City name, State name (if applicable)
// Country name
// Icon w/ Current temp overlaid
// Description and/or Main info
// Feels like temp / Humidity
// Pressure / Wind speed
// Clouds / Visibility
// Sunrise / Sunset
