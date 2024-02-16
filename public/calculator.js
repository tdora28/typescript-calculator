"use strict";
const display = document.querySelector('#display');
display.value = '0';
let activeState = 'initState';
let operatorCount = 0;
let zeroInFront = false;
function clearDisplay() {
    display.value = '0';
    activeState = 'initState';
    operatorCount = 0;
    zeroInFront = false;
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
}
function inputOperator(operator) {
    if (activeState === 'initState' || activeState === 'numberState' || activeState === 'resultState') {
        display.value += operator;
        activeState = 'operatorState';
        operatorCount = 1;
    }
    else if (activeState === 'operatorState' && operatorCount === 1) {
        if (operator === '-' && display.value.slice(-1) !== '-') {
            display.value += operator;
            operatorCount = 2;
        }
        else {
            display.value = display.value.slice(0, -1) + operator;
        }
    }
    else if (activeState === 'operatorState' && operatorCount === 2) {
        display.value = display.value.slice(0, -2) + operator;
        operatorCount = 1;
    }
}
function calculateResult() {
    if (activeState === 'operatorState') {
        const cutAmount = -1 * operatorCount;
        display.value = display.value.slice(0, cutAmount);
    }
    const result = eval(display.value);
    display.value = result.toString();
    activeState = 'resultState';
    zeroInFront = false;
}
document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (!isNaN(Number(key))) {
        inputNumber(Number(key));
    }
    else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
    }
    else if (['=', 'Enter'].includes(key)) {
        calculateResult();
    }
    else if (['Backspace', 'Delete'].includes(key)) {
        clearDisplay();
    }
    event.preventDefault();
});
const exposedFunctions = {
    clearDisplay,
    inputNumber,
    inputOperator,
    calculateResult,
};
window.Calc = exposedFunctions;
