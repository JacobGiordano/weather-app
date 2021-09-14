import currentWeather from "./currentWeather";
import data_ops from "./data_ops";
import makeNewEl from "./makeNewEl";

const ui = {
  clearElement(parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  },
  listFoundLocations(foundJson, searchTerms) {
    pageMsgs.textContent = `${foundJson.length} cities found matching "${searchTerms}"`

    const resultsUl = document.getElementById("results-ul");
    this.clearElement(resultsUl);

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
      const newLi = makeNewEl({
        tag: "li",
        classes: "results-li",
        attributes: {
          id: `li-${i + 1}`,
          "data-coordinates": `${currentObj.coord.lat}, ${currentObj.coord.lon}`
        }
      });
      newLi.appendChild(cityEl);
      newLi.appendChild(commaEl.cloneNode(true));
      stateEl ? newLi.appendChild(stateEl) : null;
      stateEl ? newLi.appendChild(commaEl) : null;
      newLi.appendChild(countryEl);
      newLi.addEventListener("click", this.handleLocationClick, false);
      newLi.classList.add("fade-in");
      resultsUl.appendChild(newLi);
      resultsWrapper.classList.add("fade-in");
    }
  },
  async handleLocationClick(e) {
    const filteredData = await data_ops.fetchSelectedCityData(e);
    pageMsgs.textContent = "";
    ui.clearElement(resultsUl);
    currentWeather.populateCurrentWeather(filteredData);
  },
  async handleSearch() {
    const searchTerms = searchInput.value;
    const foundJson = data_ops.findCityInJson(searchTerms);
    if (foundJson.length === 0) {
      pageMsgs.textContent = `No cities found matching "${searchTerms}". Please try again.`;
      return;
    }
    if (foundJson.length > 1) {
      ui.listFoundLocations(foundJson, searchTerms);
    } else {
      pageMsgs.textContent = "";
      const fetchObj = foundJson[0];
      fetchObj.lat = foundJson[0].coord.lat;
      fetchObj.lon = foundJson[0].coord.lon; 
      const returnedData = await data_ops.fetchCityData(fetchObj);
      const filteredData = data_ops.filterData(returnedData, fetchObj);
      currentWeather.populateCurrentWeather(filteredData);
      return filteredData;
    }
  },
  toggleTemp(tempCheckboxIsCheckedBool) {
    tempCheckboxIsCheckedBool ? tempUnitCheckbox.checked = false : tempUnitCheckbox.checked = true;
    if (!tempCheckboxIsCheckedBool) {
      farenheit.classList.add("selected");
      celcius.classList.remove("selected");
    } else {
      celcius.classList.add("selected");
      farenheit.classList.remove("selected");
    }
  },
  updateTemps() {
    const tempElementIdArray = ["current-weather-temp", "current-weather-feels-like"];
    currentWeather.convertTemps(tempElementIdArray);
    data_ops.setTempCheckbox();
  },
  handleTempUnitClick() {
    ui.toggleTemp(tempUnitCheckbox.checked);
    ui.updateTemps();
  }
}

const searchInput = document.getElementById("search-input");
const resultsWrapper = document.getElementById("results-wrapper");
const pageMsgs = document.getElementById("page-msgs");
const resultsUl = document.getElementById("results-ul");
const tempUnitCheckbox = document.getElementById("temp-unit-checkbox");
const tempUnitSlider = document.getElementById("temp-unit-slider");
const celcius = document.getElementById("celcius");
const farenheit = document.getElementById("farenheit");

tempUnitSlider.addEventListener("click", e => {
  ui.handleTempUnitClick(e);
})

export default ui;