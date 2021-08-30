const ui = {
  clearList(parentElement) {
    pageMsgs.textContent = "";
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }
}

const pageMsgs = document.getElementById("page-msgs");

export default ui;