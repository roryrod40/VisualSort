"use strict";

/****************************
  Useful Variables
 **************************/
// constants
let elementNum = 30;
let arr = Array(elementNum);
const maxElement = 100;
let timePerOperation = 33;
const currentColor1 = "#4f759b";
const completedColor = "#436436";
// booleans
let arrIsGen = false;
let canClick = true;
let canClickSort = false;
// html items
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

/****************************
  Get Speed and Size of Arrays
 ****************************/
speedSlider.oninput = function () {
  timePerOperation = 250 / (this.value * this.value);
};
sizeSlider.oninput = function () {
  elementNum = 10 * this.value;
};

/****************************
 Print Array Function
 ****************************/
function printArr() {
  // Remove array from HTML if present;
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

/****************************
 Reset Array Element Color Function
 ****************************/
function resetColor(i) {
  // Find array element
  arrElements = document.querySelectorAll(".bar");
  const element = arrElements[i];
  // Reset color and text color
  element.style.backgroundColor = "";
  element.firstChild.style.color = "";
}

/****************************
 Color Array Element Function
 ****************************/
function colorArr(arrNum, colorCode) {
  // Find array element
  arrElements = document.querySelectorAll(".bar");
  const element = arrElements[arrNum];
  // Add color and text color
  element.style.backgroundColor = colorCode;
  element.firstChild.style.color = colorCode;
}

/****************************
 Toogle Can Click Function
 ****************************/
function toggleCanClick() {
  if (canClick) {
    // Don't allow buttons to be clicked
    canClick = false;
    headTitles.forEach((title) => {
      title.style.cursor = "default";
    });
  } else {
    // Allow buttons to be clicked
    canClick = true;
    headTitles.forEach((title) => {
      title.style.cursor = "pointer";
    });
  }
}

/****************************
 Toogle Can Click Sort Function
 ****************************/
function toggleCanClickSort() {
  if (canClickSort) {
    // Don't allow sort buttons to be clicked
    canClickSort = false;
    sortTitles.forEach((title) => {
      title.style.cursor = "default";
    });
  } else {
    // Allow sort buttons to be clicked
    canClickSort = true;
    sortTitles.forEach((title) => {
      title.style.cursor = "pointer";
    });
  }
}

/****************************
 Generate Array Function
 ****************************/
function generateArray() {
  // Return if array is being sorted
  if (!canClick) return;
  // Allow sorting after array is generated
  if (!canClickSort) toggleCanClickSort();
  arr = Array(elementNum);
  // Loop through array and generate random elements
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.trunc(Math.random() * maxElement);
  }
  // Print message and array
  inputMsg.textContent =
    "Random array generated! Choose a sorting algorithm :)";
  printArr();
  // Set generated array flag
  arrIsGen = true;
}
genArrBtn.addEventListener("click", generateArray);

/****************************
 Bubble Sort Function
 ****************************/
function bubbleSort() {
  // Return if sort cannot be done
  if (!arrIsGen || !canClick || !canClickSort) return;
  // Print runtime
  inputMsg.textContent = "Bubble sort runtime is O(n^2)!";
  // Disable buttons form being clicked
  toggleCanClick();
  // Perform BubbleSort
  let len = arr.length;
  let num = 1;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // Perform operations after a certian amount of time
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
        // Color active elements
        if (j - 1 >= 0) resetColor(j - 1);
        colorArr(j, currentColor1);
        colorArr(j + 1, currentColor1);
      }, num * timePerOperation);
      num++;
    }
    // Color completed elements
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

/****************************
 Selection Sort Function
 ****************************/
