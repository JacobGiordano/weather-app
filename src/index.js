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

const fetchCityData = async cityObj => {
  const apiKey = secret.key;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityObj.name},${cityObj.state ? cityObj.state + "," : ""}${cityObj.country}&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);
  return data;
}

const fetchSelectedCityData = async e => {
  const clickedEl = e.target.closest("li");
  const fetchObj = {
    name: clickedEl.querySelector(".li-city").textContent,
    country: clickedEl.querySelector(".li-country").textContent
  }
  clickedEl.querySelector(".li-state") ? fetchObj.state = clickedEl.querySelector(".li-state").textContent : null;
  clearList(mainEl);
  const returnedData = await fetchCityData(fetchObj);
  const filteredData = filterData(returnedData, clickedEl.querySelector(".li-state") ? fetchObj.state : null);
  return filteredData;
}

const filterData = (data, optionalState) => {
  const filteredData = {
    city: data.name,
    country: data.sys.country,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    temp: data.main.temp,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    visibility: data.visibility,
    wind_speed: data.wind.speed
  }
  optionalState ? filteredData.state: optionalState;

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
          id: `li-${i + 1}`
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
    const returnedData = await fetchCityData(foundJson[0]);
    const filteredData = filterData(returnedData, foundJson.state ? foundJson.state : null);
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