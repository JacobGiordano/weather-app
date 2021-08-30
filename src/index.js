import "core-js/stable";
import "regenerator-runtime/runtime";
import data_ops from "./data_ops";

const init = () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    data_ops.handleSearch();
  });
};

document.addEventListener("DOMContentLoaded", init);
