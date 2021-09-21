import "core-js/stable";
import "regenerator-runtime/runtime";
import data_ops from "./data_ops.js";
import ui from "./ui.js";

const init = () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    ui.handleSearch();
  });

  const storedCheckboxState = data_ops.getTempCheckbox();
  
  if (storedCheckboxState === "true") {
    ui.toggleTemp(false)
    ui.updateTemps();
  }

  window.cityList;
  fetch("./city.list.min.json")
      .then(response => response.json())
      .then(data => window.cityList = data);
};

document.addEventListener("DOMContentLoaded", init);
