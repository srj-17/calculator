// calculator operations
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keys = document.querySelector('.keys');
let firstOperand;
let secondOperand;
let displayValue;

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
            result = add(firstOperand, secondOperand);   
            break;
        
        case "-":
            result = subtract(firstOperand, secondOperand);
            break;
        
        case "/":
            result = divide(firstOperand, secondOperand);
            break;

        case "*":
            result = multiply(firstOperand, secondOperand);
            break;

        default:
            break;
    }
    return result;
}

keys.addEventListener('click', (event) => {
    displayValue = event.target.value || '';
    display.innerText += displayValue;
});
