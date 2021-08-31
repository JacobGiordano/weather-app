import "core-js/stable";
import "regenerator-runtime/runtime";
import ui from "./ui.js";

const init = () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    ui.handleSearch();
  });
};

document.addEventListener("DOMContentLoaded", init);
