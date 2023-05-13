"use strict";

/*
 * Useful Variables
 */
let elementNum = 30;
let arr = Array(elementNum);
const maxElement = 100;
let timePerOperation = 33;
let arrIsGen = false;
let canClick = true;
let canClickSort = false;
const headTitles = document.querySelectorAll(".head_title");
const sortTitles = document.querySelectorAll(".sort");
const genArrBtn = document.querySelector(".gen_arr");
const inputMsg = document.querySelector(".input_msg");
const arrContianer = document.querySelector(".arr_container");
let arrElements = document.querySelectorAll(".bar");
const bubSortBtn = document.querySelector(".bub_sort");
const merSortBtn = document.querySelector(".mer_sort");
const speedSlider = document.querySelector(".speed");
const sizeSlider = document.querySelector(".size");
const currentColor1 = "#4f759b";
const completedColor = "#436436";

/*
 * Get speed and size of arrays
 */
speedSlider.oninput = function () {
  timePerOperation = 250 / (this.value * this.value);
};
sizeSlider.oninput = function () {
  elementNum = 10 * this.value;
};

/*
 * Print Array Function
 */
function printArr() {
  //Remove array from HTML if present;
  arrElements = document.querySelectorAll(".bar");
  arrElements.forEach((element) => {
    element.remove();
  });

  // Loop to add each element of array to HTML
  arr.forEach((num) => {
    // Create span for data
    const data = document.createElement("span");
    data.classList.add("data");
    data.innerHTML = num;
    // Create array element
    const element = document.createElement("div");
    element.classList.add("bar");
    element.setAttribute("style", `--bar-value:${num}%;`);
    element.data = num;
    element.style.width = 80 / elementNum + "%";
    element.appendChild(data);
    arrContianer.appendChild(element);
  });
}

/*
 * Reset Color Array Element Function
 */
function resetColor(i) {
  arrElements = document.querySelectorAll(".bar");
  const element = arrElements[i];
  element.style.backgroundColor = "";
  element.firstChild.style.color = "";
}

/*
 * Color Array Element Function
 */
function colorArr(arrNum, colorCode) {
  // Find array element
  arrElements = document.querySelectorAll(".bar");
  const element = arrElements[arrNum];
  element.style.backgroundColor = colorCode;
  element.firstChild.style.color = colorCode;
}

/*
 * Toggle Can Click Function
 */
function toggleCanClick() {
  if (canClick) {
    canClick = false;
    headTitles.forEach((title) => {
      title.style.cursor = "default";
    });
  } else {
    canClick = true;
    headTitles.forEach((title) => {
      title.style.cursor = "pointer";
    });
  }
}

/*
 * Toggle Can Click Sort Function
 */
function toggleCanClickSort() {
  if (canClickSort) {
    canClickSort = false;
    sortTitles.forEach((title) => {
      title.style.cursor = "default";
    });
  } else {
    canClickSort = true;
    sortTitles.forEach((title) => {
      title.style.cursor = "pointer";
    });
  }
}

/*
 * Generate Array Button
 */
function generateArray() {
  toggleCanClickSort();
  arrIsGen = true;
  if (!canClick) return;
  arr = Array(elementNum);
  // Create array with random elements
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.trunc(Math.random() * maxElement);
  }
  // Print message and array
  inputMsg.textContent =
    "Random array generated! Choose a sorting algorithm :)";
  printArr();
}
genArrBtn.addEventListener("click", generateArray);

/*
 * Generate Bubble Sort Button
 */
function bubbleSort() {
  // Return if sort cannot be done
  if (!arrIsGen || !canClick || !canClickSort) return;
  // Print runtime
  inputMsg.textContent = "Bubble sort runtime is O(n^2)!";
  toggleCanClick();
  // Preform BubbleSort
  let len = arr.length;
  let num = 1;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // Preform operations after a certian amount of time
      setTimeout(() => {
        arrElements = document.querySelectorAll(".bar");
        if (arr[j] > arr[j + 1]) {
          // Update array elements
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          // Update elements in HTML
          arrElements[j].setAttribute("style", `--bar-value:${arr[j]}%;`);
          arrElements[j].setAttribute("data", arr[j]);
          arrElements[j].firstChild.textContent = arr[j];
          arrElements[j].style.width = 80 / arr.length + "%";
          arrElements[j + 1].setAttribute(
            "style",
            `--bar-value:${arr[j + 1]}%;`
          );
          arrElements[j + 1].setAttribute("data", arr[j + 1]);
          arrElements[j + 1].firstChild.textContent = arr[j + 1];
          arrElements[j + 1].style.width = 80 / arr.length + "%";
        }
        if (j - 1 >= 0) resetColor(j - 1);
        colorArr(j, currentColor1);
        colorArr(j + 1, currentColor1);
      }, num * timePerOperation);
      num++;
    }
    setTimeout(() => {
      colorArr(arr.length - 1 - i, completedColor);
      resetColor(arr.length - 2 - i);
    }, num * timePerOperation);
  }
  // Reset color to default color and allow other buttons to be clicked
  setTimeout(() => {
    colorArr(0, completedColor);
    toggleCanClick();
    toggleCanClickSort();
    inputMsg.textContent =
      "Congrats your array is now sorted! Click Generate Array to try again!";
  }, num * timePerOperation);
}
bubSortBtn.addEventListener("click", bubbleSort);
