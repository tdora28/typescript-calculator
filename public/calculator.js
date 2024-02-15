"use strict";
const display = document.querySelector('#display');
// Shows "0" on the display initially
display.value = '0';
// Follows the different input states
let activeState = 'initState';
// Counts how many operators are in a row
// E.g. "", "+", "*-" are acceptable
let operatorCount = 0;
let zeroInFront = false;
function clearDisplay() {
    display.value = '0';
    activeState = 'initState';
    operatorCount = 0;
    zeroInFront = false;
    console.log(display.value, activeState);
}
function inputNumber(num) {
    if (activeState === 'resultState') {
        if (num === 0) {
            clearDisplay();
        }
        else {
            display.value = num.toString();
            activeState = 'numberState';
        }
    }
    else if (activeState === 'initState' && num !== 0) {
        display.value = num.toString();
        activeState = 'numberState';
    }
    else if (activeState === 'operatorState') {
        if (num === 0)
            zeroInFront = true;
        display.value += num.toString();
        activeState = 'numberState';
    }
    else if (activeState === 'numberState') {
        if (zeroInFront && num === 0) {
            display.value = display.value;
        }
        else if (zeroInFront && num !== 0) {
            display.value = display.value.slice(0, -1) + num.toString();
            zeroInFront = false;
        }
        else {
            display.value += num.toString();
        }
    }
    console.log(display.value, activeState);
}
function inputOperator(operator) {
    if (activeState === 'initState' || activeState === 'numberState' || activeState === 'resultState') {
        display.value += operator;
        activeState = 'operatorState';
        operatorCount = 1;
    }
    else if (activeState === 'operatorState' && operatorCount === 1) {
        if (operator === '-' && display.value.slice(-1) !== '-') {
            // This allows "+-", "*-", and "/-"
            display.value += operator;
            operatorCount = 2;
        }
        else {
            // This switches the last entered operator to the new one
            display.value = display.value.slice(0, -1) + operator;
        }
    }
    else if (activeState === 'operatorState' && operatorCount === 2) {
        display.value = display.value.slice(0, -2) + operator;
        operatorCount = 1;
    }
    console.log(display.value, activeState);
}
function calculateResult() {
    if (activeState === 'operatorState') {
        // In case there are trailing operators when hitting the equal sign
        const cutAmount = -1 * operatorCount;
        display.value = display.value.slice(0, cutAmount);
    }
    const result = eval(display.value);
    display.value = result.toString();
    activeState = 'resultState';
    zeroInFront = false;
    console.log(display.value, activeState);
}
// Expose the functions to the global scope so they can be accessed from HTML
const exposedFunctions = {
    clearDisplay,
    inputNumber,
    inputOperator,
    calculateResult,
};
// Attach the object to the window, under a single namespace
window.Calc = exposedFunctions;
