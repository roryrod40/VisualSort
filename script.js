"use strict";

/*
 * Useful Variables
 */
const elementNum = 30;
let arr = Array(elementNum);
const maxElement = 100;
const timePerOperation = 100;
let canClick = true;
const headTitles = document.querySelectorAll(".head_title");
const genArrBtn = document.querySelector(".gen_arr");
const inputMsg = document.querySelector(".input_msg");
const arrContianer = document.querySelector(".arr_container");
let arrElements = document.querySelectorAll(".bar");
const bubSortBtn = document.querySelector(".bub_sort");

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
    element.setAttribute("data", num);
    element.style.width = 80 / elementNum + "%";
    element.appendChild(data);
    arrContianer.appendChild(element);
  });
}

/*
 * Reset Color Array Element Function
 */
function resetColor() {
  arrElements = document.querySelectorAll(".bar");
  arrElements.forEach((element) => {
    element.style.backgroundColor = "";
    element.firstChild.style.color = "";
  });
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
      title.style.cursor = "";
    });
  }
}

/*
 * Generate Array Button
 */
function generateArray() {
  if (canClick) {
    // Create array with random elements
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.trunc(Math.random() * maxElement);
    }
    console.log(arr);

    // Remove input message from HTML if present
    if (inputMsg) inputMsg.remove();

    printArr();
  }
}
genArrBtn.addEventListener("click", generateArray);

/*
 * Generate Bubble Sort Button
 */
function bubbleSort() {
  // Preform BubbleSort
  if (canClick) {
    toggleCanClick();
    let len = arr.length;
    let num = 1;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        // Preform operations after a certian amount of time
        setTimeout(() => {
          // Color two elements being looked at
          printArr();
          colorArr(j, "#a44a3f");
          colorArr(j + 1, "#a44a3f");
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }, num * timePerOperation);
        num++;
      }
    }
    // Reset color to default color and allow other buttons to be clicked
    setTimeout(() => {
      resetColor();
      toggleCanClick();
    }, num * timePerOperation);
  }
}
bubSortBtn.addEventListener("click", bubbleSort);
