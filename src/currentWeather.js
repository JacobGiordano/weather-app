import makeNewEl from "./makeNewEl";

const currentWeather = {
  createLocation(filteredData) {
    const data = filteredData.current;
    const spanArray = [data.city, data.country];
    data.state ? spanArray.push(data.state) : null;
    console.log(spanArray);
  }
}

export default currentWeather;

// City name, State name (if applicable)
// Country name
// Icon w/ Current temp overlaid
// Feels like temp / Humidity
// Pressure / Wind speed
// Low temp / High temp
// Clouds / Visibility
// Description and/or Main info
// Sunrise / Sunset
