"use strict";
const display = document.querySelector('#display');
// Shows "0" on the display initially
display.value = '0';
// Follows the different input states
let activeState = 'init';
// Counts how many operators are in a row
// E.g. "", "+", "*-" are acceptable
let operatorCount = 0;
function clearDisplay() {
    display.value = '0';
    activeState = 'init';
    operatorCount = 0;
}
function inputNumber(num) {
    if ((activeState === 'init' || activeState === 'result') && num !== 0) {
        display.value = num.toString();
        activeState = 'number';
    }
    else if (activeState === 'operator' && num !== 0) {
        display.value += num;
        activeState = 'number';
    }
    else if (activeState === 'number') {
        display.value += num;
    }
}
function inputOperator(operator) {
    if (activeState === 'init' || activeState === 'number' || activeState === 'result') {
        display.value += operator;
        activeState = 'operator';
        operatorCount = 1;
    }
    else if (activeState === 'operator' && operatorCount === 1) {
        if (operator === '-' && display.value.slice(-1) !== '-') {
            display.value += operator;
            operatorCount = 2;
        }
        else {
            display.value = display.value.slice(0, -1) + operator;
        }
    }
}
function calculateResult() {
    if (activeState === 'operator') {
        display.value = display.value.slice(0, -1);
    }
    const result = eval(display.value);
    display.value = result.toString();
    activeState = 'result';
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
