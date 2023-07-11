const input = document.querySelector(".js-input");
const createButton = document.getElementById("create-btn");
const deleteButton = document.getElementById("delete-btn");
const boxes = document.getElementById("boxes");

const baseSize = 30;
const additionalSize = 10;

function createArray() {
  return Array.from(Array(Number(input.value)).keys());
}

function createRandomBG() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);

  return `rgb(${x},${y},${z})`;
}
function createBoxes() {
  createArray().forEach((number) => {
    const divElement = document.createElement("div");
    divElement.style.height = `${baseSize + number * additionalSize}px`;
    divElement.style.width = `${baseSize + number * additionalSize}px`;
    divElement.style.backgroundColor = createRandomBG();

    boxes.appendChild(divElement);
    input.value = "";
  });
}

function removeBoxes() {
  boxes.innerHTML = "";
}

createButton.addEventListener("click", createBoxes);
deleteButton.addEventListener("click", removeBoxes);
