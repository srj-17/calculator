// calculator operations
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keyContainer = document.querySelector('.key-container');
const numKeys = Array.from(document.querySelectorAll('.num-key'));
const operatorKeys = Array.from(document.querySelectorAll('.operator-key'));
const extraKeys = Array.from(document.querySelectorAll('.x-key'));
let firstOperand = null;
let secondOperand = null;
let displayValue = '';
let memValue = [];

const add = function(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
};

const subtract = function(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
};

const divide = function(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}

const multiply = function(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
};

const operate = function (operator, firstOperand, secondOperand) {
    let result;
    switch (operator) {
        case "+":
            result = add(+firstOperand, +secondOperand);   
            break;
        
        case "-":
            result = subtract(+firstOperand, +secondOperand);
            break;
        
        case "/":
            result = divide(+firstOperand, +secondOperand);
            break;

        case "*":
            result = multiply(+firstOperand, +secondOperand);
            break;

        default:
            break;
    }
    return String(result);
}

keyContainer.addEventListener('click', (event) => {
    if (event.target.value in numKeys) {
        if (memValue.length === 3) {
            displayValue = memValue.shift;
        } else {
            if (memValue.at(-1) in operatorKeys) {
                memValue = memValue.unshift()
            }
            displayValue = displayValue.concat(event.target.value);
        } 
        display.textContent = displayValue;
    } else if (event.target.value in operatorKeys) {
        if (memValue.length === 3) {
            displayValue = operate(memValue[1], parseFloat(memValue[0]),
                           parseFloat(memValue[2]));
            if (event.target.value === '=') {
                display.textContent = displayValue;
                memValue = [].concat(displayValue);
            } else {
                display.textContent = displayValue;
                memValue = [displayValue, event.target.value, ''];
                // last value pops out next time numeric value is pressed
            }
        } else { // if (memValue.length < 3) 
            if (event.target.value === '=') {
                display.textContent = 'Not Calculable';
            } else {
                memValue = memValue.concat(event.target.value);
            }
        }
    } else { // in extraKeys
        switch(event.target.value) {
            case '.':
                if (displayValue === '') {
                    displayValue = '.';
                    display.textContent = displayValue;
                } else {
                    displayValue = displayValue.concat(event.target.value);
                    display.textContent = displayValue;
                }
            case 'clear':
                display.textContent = '';
                memValue = [];
            case 'sign':
                if (display === ''){
                    displayValue = displayValue.concat(event.target.textContent);
                    // don't display, we're just keeping it for the next number
                } else {
                    if (Math.sign(displayValue)) { // in case displayValue doesn't already have some special character except number like "-"    
                        if (Math.sign(displayValue) === 1) {
                            displayValue = String(-displayValue);
                        } else if (Math.sign(displayValue) === -1) { 
                            displayValue = String(Math.abs(displayValue));
                        } 
                    }
                }
        }
    }
});

