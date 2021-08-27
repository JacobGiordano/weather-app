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

const fetchSelectedCityData = e => {
  const clickedEl = e.target.closest("li");
  console.log(clickedEl);
}

const handleSearch = () => {
  const searchTerms = searchInput.value;
  const foundJson = findCityInJson(searchTerms);
  clearList(mainEl);
  if (foundJson.length > 1) {
    const resultsUL = makeNewEl({
      tag: "ul", 
      classes: "results-ul"
    });
    mainEl.appendChild(resultsUL);
    for (let i = 0; i < foundJson.length; i ++) {
      const currentObj = foundJson[i];
      const cityEl = makeNewEl({
        tag: "span",
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
          text: currentObj.state
        });
      }
      const countryEl = makeNewEl({
        tag: "span",
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
    fetchCityData(foundJson[0]);
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