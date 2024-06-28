// calculator operations
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keyContainer = document.querySelector('.key-container');
const numKeys = Array.from(document.querySelectorAll('.num-key'));
const operatorKeys = Array.from(document.querySelectorAll('.operator-key'));
const extraKeys = Array.from(document.querySelectorAll('.x-key'));
let displayValue = '';

function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return String(Math.round(value * multiplier) / multiplier);
}

function output (text) {
    display.textContent = text;
}

const add = function(accumulator, secondNumber) {
    return accumulator + secondNumber;
};

const subtract = function(accumulator, secondNumber) {
    return accumulator - secondNumber;
};

const divide = function(accumulator, secondNumber) {
    return accumulator / secondNumber;
}

const multiply = function(accumulator, secondNumber) {
    return accumulator * secondNumber;
};

// calc object for storing what's in calculator's memory
let memory = {
    accumulator: null, // fistNumber acts as accumulator
    displayBuffer: null,
    operator: null,
    operate (operator, accumulator, secondNumber) {
        let result;
        switch (operator) {
            case "+":
                result = add(+accumulator, +secondNumber);   
                break;
            
            case "-":
                result = subtract(+accumulator, +secondNumber);
                break;
            
            case "/":
                result = divide(+accumulator, +secondNumber);
                break;
    
            case "*":
                result = multiply(+accumulator, +secondNumber);
                break;

            case "=":
                result = accumulator;
                break;
    
            default:
                result = accumulator;
                break;
        }
        return String(result);
    }, 

    clear() {
        this.accumulator = null;
        this.displayBuffer = null;
        this.operator = null;
    }
}

function operatorKeyContains(value) {
    let yes = operatorKeys.reduce((containsDisplayValue, operatorKey) => {
                return (operatorKey.value === value) ? (containsDisplayValue || true) : (containsDisplayValue || false);  
            }, false);
    return yes;
}

// receive a button press
keyContainer.addEventListener('click', (press) => {
    value = press.target.value;
    if (value) {
        // for initial operation after turning calculator on
        if (displayValue === '0') {
            displayValue = '';
        }
        if (displayValue === 'HOHOHOH') {
            memory.accumulator = '0';
            displayValue = '';
        }
        if (numKeys.includes(press.target)) {
            if (memory.displayBuffer) { 
                displayValue = '';
                memory.displayBuffer = false;
            }
            displayValue = displayValue.concat(value);
            output(displayValue);
        } else if (operatorKeys.includes(press.target)) {
            if (!memory.accumulator) { 
                memory.accumulator = displayValue;
                memory.operator = value;
            } else {
                if (memory.operator === '=') {
                    memory.accumulator = displayValue;
                }
                memory.accumulator = memory.operate(memory.operator, memory.accumulator, displayValue);
                // round to 2 precision
                memory.accumulator = round(memory.accumulator, 2);
                displayValue = memory.accumulator; 
                memory.operator = value;
                if (memory.operator === value) {
                    displayValue = memory.accumulator;
                }
            }
            memory.displayBuffer = true;
        } else if (extraKeys.includes(press.target)) {
            switch (value) {
                case '.':
                    if (displayValue) {
                        if (!displayValue.includes('.')) {
                            displayValue = displayValue.concat(value);
                        }
                    } else if (!displayValue || memory.accumulator) { // if operation pachi ho bhane value goes to memory accumulator
                        displayValue = '0.';
                    }
                    break;
                case 'sign':
                    if (displayValue.at(0) === '-') {
                        displayValue = displayValue.split('').toSpliced(0, 1).join('');
                    } else {
                        displayValue = displayValue.split('').toSpliced(0, 0, '-').join('');
                    }
                    break;
                case 'clear':
                    displayValue = '0';
                    memory.clear();
                    break;
                case 'percent':
                    displayValue = String(parseFloat(displayValue) / 100);
                    break;
                default:
                    break;
            }
        }
        // just to be sure
        if (displayValue === '') {
            displayValue = '0';
        } 
        if (displayValue === 'NaN') {
            displayValue = '0';
            memory.clear();
        }
        if (displayValue === 'Infinity') {
            displayValue = 'HOHOHOH';
            memory.clear();
        } 
    output(displayValue);
    } else { // if area of keyContainer having no value is selected
        displayValue += '';
    }
})
