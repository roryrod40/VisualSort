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
// const currentColor2 = "#331832";
const currentColor2 = "#563C5C";
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
const selSortBtn = document.querySelector(".sel_sort");
const insSortBtn = document.querySelector(".ins_sort");
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
 Swap Elements Function
 ****************************/
function swapElements(i, j) {
  arrElements = document.querySelectorAll(".bar");
  // Update array elements
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  // Update elements in HTML
  arrElements[i].setAttribute("style", `--bar-value:${arr[i]}%;`);
  arrElements[i].setAttribute("data", arr[i]);
  arrElements[i].firstChild.textContent = arr[i];
  arrElements[i].style.width = 80 / arr.length + "%";
  arrElements[j].setAttribute("style", `--bar-value:${arr[j]}%;`);
  arrElements[j].setAttribute("data", arr[j]);
  arrElements[j].firstChild.textContent = arr[j];
  arrElements[j].style.width = 80 / arr.length + "%";
}

/****************************
 Set Element Function
 ****************************/
function setElement(i, j, num) {
  arrElements = document.querySelectorAll(".bar");
  // Update array element
  // arr[i] = j;
  // Update element in HTML
  setTimeout(() => {
    arrElements[i].setAttribute("style", `--bar-value:${j}%;`);
    arrElements[i].setAttribute("data", j);
    arrElements[i].firstChild.textContent = j;
    arrElements[i].style.width = 80 / arr.length + "%";
  }, num * timePerOperation);
}

/****************************
 Reset Array Element Color Function
 ****************************/
function resetColor(arrNum) {
  // Find array element
  arrElements = document.querySelectorAll(".bar");
  const element = arrElements[arrNum];
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
  let num = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Perform operations after a certian amount of time
      setTimeout(() => {
        // Swap elements if necessary
        if (arr[j] > arr[j + 1]) {
          swapElements(j, j + 1);
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
function selectionSort() {
  // Return if sort cannot be done
  if (!arrIsGen || !canClick || !canClickSort) return;
  // Print runtime
  inputMsg.textContent = "Selection sort runtime is O(n^2)!";
  // Disable buttons form being clicked
  toggleCanClick();
  // Perform SelectionSort
  let num = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      // Perform operations after a certian amount of time
      setTimeout(() => {
        // Color active elements
        colorArr(minIndex, currentColor2);
        if (j - 1 != minIndex) resetColor(j - 1);
        colorArr(j, currentColor1);
        if (arr[j] < arr[minIndex]) {
          resetColor(minIndex);
          minIndex = j;
          colorArr(minIndex, currentColor2);
        }
      }, num * timePerOperation);
      num++;
    }
    // Color completed elements
    setTimeout(() => {
      swapElements(i, minIndex);
      resetColor(minIndex);
      resetColor(arr.length - 1);
      colorArr(i, completedColor);
    }, num * timePerOperation);
  }
  // Reset color to default color and allow other buttons to be clicked
  setTimeout(() => {
    colorArr(arr.length - 1, completedColor);
    toggleCanClick();
    toggleCanClickSort();
    inputMsg.textContent =
      "Congrats your array is now sorted! Click Generate Array to try again!";
  }, num * timePerOperation);
}
selSortBtn.addEventListener("click", selectionSort);

/****************************
 Insertion Sort Functions
 ****************************/
function colorInsert1(i, j, num) {
  setTimeout(() => {
    if (j + 2 < arr.length - 1 && j + 2 < i) colorArr(j + 2, completedColor);
    colorArr(j + 1, currentColor1);
    colorArr(j, currentColor1);
    colorArr(i, currentColor2);
  }, num * timePerOperation);
}

function colorInsert2(i, j, num) {
  setTimeout(() => {
    colorArr(j + 1, completedColor);
    colorArr(j + 2, completedColor);
    if (j > -1) colorArr(j, completedColor);
  }, num * timePerOperation);
}

function insertionSort() {
  // Return if sort cannot be done
  if (!arrIsGen || !canClick || !canClickSort) return;
  // Print runtime
  inputMsg.textContent = "Insertion sort runtime is O(n^2)!";
  // Disable buttons form being clicked
  toggleCanClick();
  // Perform Insertion Sort
  let num = 0;
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      // Perform operations after a certian amount of time
      setElement(j + 1, arr[j + 1], num);
      // Color current elements
      colorInsert1(i, j, num);
      j--;
      num++;
    }
    // Color completed elements
    arr[j + 1] = current;
    setElement(j + 1, current, num);
    colorInsert2(i, j, num);
  }
  // Reset color to default color and allow other buttons to be clicked
  setTimeout(() => {
    colorArr(arr.length - 1, completedColor);
    toggleCanClick();
    toggleCanClickSort();
    inputMsg.textContent =
      "Congrats your array is now sorted! Click Generate Array to try again!";
  }, num * timePerOperation);
}
insSortBtn.addEventListener("click", insertionSort);

/****************************
 Merge Sort Function
 ****************************/
function mergeSort() {
  // Return if sort cannot be done
  if (!arrIsGen || !canClick || !canClickSort) return;
  // Print runtime
  inputMsg.textContent = "Merge sort runtime is O(log n)!";
  // Disable buttons form being clicked
  toggleCanClick();
  // Perform Merge Sort
  let num = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      // Perform operations after a certian amount of time
      setTimeout(() => {
        // Color active elements
        colorArr(minIndex, currentColor2);
        if (j - 1 != minIndex) resetColor(j - 1);
        colorArr(j, currentColor1);
        if (arr[j] < arr[minIndex]) {
          resetColor(minIndex);
          minIndex = j;
          colorArr(minIndex, currentColor2);
        }
      }, num * timePerOperation);
      num++;
    }
    // Color completed elements
    setTimeout(() => {
      swapElements(i, minIndex);
      resetColor(minIndex);
      resetColor(arr.length - 1);
      colorArr(i, completedColor);
    }, num * timePerOperation);
  }
  // Reset color to default color and allow other buttons to be clicked
  setTimeout(() => {
    colorArr(arr.length - 1, completedColor);
    toggleCanClick();
    toggleCanClickSort();
    inputMsg.textContent =
      "Congrats your array is now sorted! Click Generate Array to try again!";
  }, num * timePerOperation);
}
merSortBtn.addEventListener("click", mergeSort);
