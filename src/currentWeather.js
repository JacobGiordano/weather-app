const currentWeather = {
  populateCurrentWeather(filteredData) {
    const data = filteredData.current;

    for (const [key, value] of Object.entries(data)) {
      const currentSelector = key.replace("_", "-");
      const selectorString = `current-weather-${currentSelector}`;
      const currentEl = document.getElementById(selectorString);
      console.log(value);
      if (selectorString === "current-weather-icon") {
        const svgIcon = `../src/openweathermap/${value}.svg`;
        currentEl.src = svgIcon;
      } else {
        currentEl.textContent = value;
      }
    }

    if (!Object.prototype.hasOwnProperty.call(data, "state")) {
      document.getElementById("current-weather-state").textContent = "";
    }
  }
}

export default currentWeather;

// City name, State name (if applicable)
// Country name
// Icon w/ Current temp overlaid
// Description and/or Main info
// Feels like temp / Humidity
// Pressure / Wind speed
// Clouds / Visibility
// Sunrise / Sunset
