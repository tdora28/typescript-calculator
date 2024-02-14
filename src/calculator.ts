/**
 * The current input value as a string.
 */

/**
 * The previous input value as a string.
 */

/**
 * The current operation symbol (+, -, *, /) or null if none.
 */

/**
 * Calculates the result of the current operation and updates the current input value.
 * If the previous or current input values are not valid numbers, or the operation is null, does nothing.
 */

/**
 * Appends a number to the current input value and updates the display.
 * @param num - The number to append.
 */

/**
 * Sets the current operation and moves the current input value to the previous input value.
 * If there is already a previous input value, calculates the result first.
 * @param op - The operation symbol to set.
 */

/**
 * Clears the current and previous input values and the operation and updates the display.
 */

/**
 * Updates the display element with the current input value.
 */

// Initialize the display with the current input value.

const display = document.querySelector('#display') as HTMLInputElement;

display.value = '0';

// const states: string[] = ['init', 'numberInput', 'operationInput', 'result'];
let activeState: string = 'init';

function clearDisplay(): void {
  display.value = '0';
  activeState = 'init';
}

function inputNumber(num: number): void {
  if ((activeState === 'init' || activeState === 'result') && num !== 0) {
    display.value = num.toString();
    activeState = 'number';
  } else if (activeState === 'operator' && num !== 0) {
    display.value += num;
    activeState = 'number';
  } else if (activeState === 'number') {
    display.value += num;
  }
}

let operatorCount: number = 0;

function inputOperator(operator: string): void {
  if (activeState === 'init' || activeState === 'number' || activeState === 'result') {
    display.value += operator;
    activeState = 'operator';
    operatorCount = 1;
  } else if (activeState === 'operator' && operatorCount === 1) {
    if (operator === '-' && display.value.slice(-1) !== '-') {
      display.value += operator;
      operatorCount = 2;
    } else {
      display.value = display.value.slice(0, -1) + operator;
    }
  }
}

function calculateResult(): void {
  if (activeState === 'operator') {
    display.value = display.value.slice(0, -1);
  }
  const result: number = eval(display.value);
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
(window as any).Calc = exposedFunctions;
