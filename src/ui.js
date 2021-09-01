import currentWeather from "./currentWeather";
import data_ops from "./data_ops";
import makeNewEl from "./makeNewEl";

const ui = {
  clearList(parentElement) {
    // pageMsgs.textContent = "";
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  },
  listFoundLocations(foundJson, searchTerms) {
    pageMsgs.textContent = `${foundJson.length} cities found matching "${searchTerms}"`
    const resultsUL = makeNewEl({
      tag: "ul", 
      classes: "results-ul"
    });
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
      newLI.addEventListener("click", this.handleLocationClick, false);
      resultsUL.appendChild(newLI);
    }
  },
  async handleLocationClick(e) {
    const filteredData = await data_ops.fetchSelectedCityData(e);
    currentWeather.populateCurrentWeather(filteredData);
  },
  async handleSearch() {
    const searchTerms = searchInput.value;
    const foundJson = data_ops.findCityInJson(searchTerms);
    // ui.clearList(mainEl);
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
  }
}

const searchInput = document.getElementById("search-input");
const mainEl = document.getElementById("main");
const pageMsgs = document.getElementById("page-msgs");

export default ui;