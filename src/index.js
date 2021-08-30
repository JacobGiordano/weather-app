import "core-js/stable";
import "regenerator-runtime/runtime";
import secret from "./secret.js";
import cityList from "./city.list.json"
import makeNewEl from "./makeNewEl.js";

const clearList = parentElement => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

const findCityInJson = cityName => {
  console.log(cityName);
  const foundCities = cityList.filter(obj => obj.name.toLowerCase().includes(cityName.toLowerCase().trim()));
  console.log(foundCities);
  return foundCities;
};

const fetchCityData = async fetchObj => {
  console.log("FETCH OBJ:");
  console.log(fetchObj);
  const apiKey = secret.key;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${fetchObj.lat}&lon=${fetchObj.lon}&exclude=minutely,hourly&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);
  return data;
}

const fetchSelectedCityData = async e => {
  const clickedEl = e.target.closest("li");
  const coordinates = clickedEl.dataset.coordinates.split(",");
  const fetchObj = {
    name: clickedEl.querySelector(".li-city").textContent,
    country: clickedEl.querySelector(".li-country").textContent,
    lat: coordinates[0].trim(),
    lon: coordinates[1].trim()
  }
  clickedEl.querySelector(".li-state") ? fetchObj.state = clickedEl.querySelector(".li-state").textContent : null;
  clearList(mainEl);
  const returnedData = await fetchCityData(fetchObj);
  const filteredData = filterData(returnedData, fetchObj);
  return filteredData;
}

const filterData = (data, fetchObj) => {
  const filteredData = {
    city: fetchObj.name,
    country: fetchObj.country,
    feels_like: data.current.feels_like,
    humidity: data.current.humidity,
    temp: data.current.temp,
    pressure: data.current.pressure,
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
    visibility: data.current.visibility,
    wind_speed: data.current.wind_speed
  }
  fetchObj.state ? filteredData.state: fetchObj.state;

  return filteredData;
}

const handleSearch = async () => {
  const searchTerms = searchInput.value;
  const foundJson = findCityInJson(searchTerms);
  clearList(mainEl);
  if (foundJson.length > 1) {
    const resultsCount = makeNewEl({
      tag: "span", 
      classes: "results-count",
      text: `${foundJson.length} cities found matching "${searchTerms}"`
    });
    const resultsUL = makeNewEl({
      tag: "ul", 
      classes: "results-ul"
    });
    mainEl.appendChild(resultsCount);
    mainEl.appendChild(resultsUL);
    for (let i = 0; i < foundJson.length; i ++) {
      const currentObj = foundJson[i];
      const cityEl = makeNewEl({
        tag: "span",
        classes: "li-city",
        text: `${currentObj.name}`
      });
      const commaEl = makeNewEl({
        tag: "span",
        text: ", "
      });
      let stateEl = currentObj.state;
      if (stateEl) {
        stateEl = makeNewEl({
          tag: "span",
          classes: "li-state",
          text: currentObj.state
        });
      }
      const countryEl = makeNewEl({
        tag: "span",
        classes: "li-country",
        text: currentObj.country
      });
      const newLI = makeNewEl({
        tag: "li",
        classes: "results-li",
        attributes: {
          id: `li-${i + 1}`,
          "data-coordinates": `${currentObj.coord.lat}, ${currentObj.coord.lon}`
        }
      });
      newLI.appendChild(cityEl);
      newLI.appendChild(commaEl.cloneNode(true));
      stateEl ? newLI.appendChild(stateEl) : null;
      stateEl ? newLI.appendChild(commaEl) : null;
      newLI.appendChild(countryEl);
      newLI.addEventListener("click", fetchSelectedCityData, false);
      resultsUL.appendChild(newLI);
    }
  } else {
    const fetchObj = foundJson[0];
    fetchObj.lat = foundJson[0].coord.lat;
    fetchObj.lon = foundJson[0].coord.lon; 
    const returnedData = await fetchCityData(fetchObj);
    const filteredData = filterData(returnedData, fetchObj);
    return filteredData;
  }
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mainEl = document.getElementById("main");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  handleSearch();
});


// Json data example:
// {
//   "id": 833,
//   "name": "Ḩeşār-e Sefīd",
//   "state": "",
//   "country": "IR",
//   "coord": {
//       "lon": 47.159401,
//       "lat": 34.330502
//   }
// }