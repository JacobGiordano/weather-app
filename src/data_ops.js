import secret from "./secret.js";

const data_ops = {
  findCityInJson(cityName) {
    // console.log(cityName);
    const foundCities = window.cityList.filter(obj => obj.name.toLowerCase().includes(cityName.toLowerCase().trim()));
    // console.log(foundCities);
    return foundCities;
  },
  async fetchCityData(fetchObj) {
    // console.log("FETCH OBJ:");
    // console.log(fetchObj);
    const apiKey = secret.key;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fetchObj.lat}&lon=${fetchObj.lon}&exclude=minutely,hourly&appid=${apiKey}`);
    const data = await response.json();
    // console.log(data);
    return data;
  },
  async fetchSelectedCityData(e) {
    const clickedEl = e.target.closest("div");
    const coordinates = clickedEl.dataset.coordinates.split(",");
    const fetchObj = {
      name: clickedEl.querySelector(".result-city").textContent,
      country: clickedEl.querySelector(".result-country").textContent,
      lat: coordinates[0].trim(),
      lon: coordinates[1].trim()
    }
    clickedEl.querySelector(".result-state") ? fetchObj.state = clickedEl.querySelector(".result-state").textContent : null;
    // ui.clearElement(mainEl);
    const returnedData = await data_ops.fetchCityData(fetchObj);
    const filteredData = data_ops.filterData(returnedData, fetchObj);
    return filteredData;
  },
  filterData(data, fetchObj) {
    // console.log(data);
    const filteredData = {
      current: {
        city: fetchObj.name,
        country: fetchObj.country,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        temp: data.current.temp,
        // main: data.current.weather[0].main,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        // weather_id: data.current.weather[0].id,
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        clouds: data.current.clouds,
        visibility: data.current.visibility,
        wind_speed: data.current.wind_speed,
        timezone: data.timezone
      },
      forecast: [],
      alerts: []
    }
    fetchObj.state ? filteredData.current.state = fetchObj.state : null;

    for (let day of data.daily) {
      filteredData.forecast.push({
        day_temp: day.temp.day,
        high_temp: day.temp.max,
        low_temp: day.temp.min,
        humidity: day.humidity,
        chance_of_precipitation: day.pop,
        // main: day.weather.main,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
        // weather_id: day.weather.id,
        sunrise: day.sunrise,
        sunset: day.sunset,
        clouds: day.clouds,
        wind_speed: day.wind_speed
      });

      if (data.alerts) {
        for (let alert of data.alerts) {
          filteredData.alerts.push({
            sender_name: alert.sender_name,
            event: alert.event,
            start: alert.start,
            end: alert.end,
            description: alert.description,
            tags: alert.tags
          });
        }
      }
    }
  
    // console.log(filteredData);
    return filteredData;
  },
  getTempCheckbox() {
    return localStorage.getItem("tempCheckbox");
  },
  setTempCheckbox() {
    const currentState = document.getElementById("temp-unit-checkbox").checked;
    localStorage.setItem("tempCheckbox", currentState);
  }
}

export default data_ops;