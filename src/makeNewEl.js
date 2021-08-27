const makeNewEl = (obj) => {
  let newElement = document.createElement(obj.tag);
  if (obj.tag.indexOf("input") > -1) {
    if (obj.text !== "") {
      newElement.value = obj.text;
    }
  } else {
    if (obj.text !== undefined & typeof(obj.text) === "string") {
      const newElementData = document.createTextNode(obj.text);
      newElement.appendChild(newElementData);
    }
  }
  if (obj.classes !== undefined & typeof(obj.classes) === "string") {
    newElement.className += obj.classes;
  }
  if (obj.attributes !== undefined & typeof(obj.attributes) === "object") {
    for (var key in obj.attributes) {
      newElement.setAttribute(key, obj.attributes[key]);
    }
  }
  return newElement;
}

export default makeNewEl;