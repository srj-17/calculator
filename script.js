// calculator operations
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keyContainer = document.querySelector('.key-container');
const numKeys = Array.from(document.querySelectorAll('.num-key'));
const operatorKeys = Array.from(document.querySelectorAll('.operator-key'));
const extraKeys = Array.from(document.querySelectorAll('.x-key'));
let displayValue = '';

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
    secondNumber: null,
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
    
            default:
                result = accumulator;
                break;
        }
        return String(result);
    }, 
    
    full() {
        return this.accumulator && this.secondNumber && this.operator;
    },

    clear() {
        this.accumulator = null;
        this.displayBuffer = null;
        this.operator = null;
        this.secondNumber = null;
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
        // if button pressed after an operator button
        if (operatorKeyContains(memory.displayBuffer)) {
            displayValue = '';
            memory.displayBuffer = null;
        } 

        // for initial operation after turning calculator on
        if (displayValue === '0') {
            displayValue = '';
        }
        if (numKeys.includes(press.target)) {
            displayValue = displayValue.concat(value);
            output(displayValue);
        } else if (operatorKeys.includes(press.target)) {
            if (value === '=') {
                if (!memory.accumulator) {
                    displayValue = 'Not Calculable';
                } 
                else if (memory.operator === '=') {
                    memory.accumulator = displayValue;
                }
                else {
                    [memory.accumulator, memory.secondNumber] = 
                    [memory.operate(memory.operator, memory.accumulator, displayValue), null];
                    displayValue = memory.accumulator;
                }
                memory.operator = value;
                memory.displayBuffer = value;
            } else { // for other operators than '='
                if (!memory.accumulator) {
                    memory.accumulator = displayValue;
                    memory.secondNumber = null;
                    memory.operator = value;
                } 
                else {
                    [memory.accumulator, memory.secondNumber] = 
                    [memory.operate(memory.operator, memory.accumulator, displayValue), null];
                    displayValue = memory.accumulator;
                    memory.operator = value;
                }
                memory.displayBuffer = value; // next time accessed, if displayBuffer is seen as operator, 
                                          // then display thd displayValue and empty displayValue
            }
        } else if (extraKeys.includes(press.target)) {
            switch (value) {
                case '.':
                    if (!displayValue.includes('.')) {
                        displayValue = displayValue.concat(value);
                    } 
                    output(displayValue);
                    break;
                case 'sign':
                    if (displayValue.at(0) === '-') {
                        displayValue = displayValue.split('').toSpliced(0, 1).join('');
                    } else {
                        displayValue = displayValue.split('').toSpliced(0, 0, '-').join('');
                    }
                    output(displayValue);
                    break;
                case 'clear':
                    displayValue = '0';
                    memory.clear();
                    output(displayValue);
                    break;
                case 'percent':
                    displayValue = String(parseFloat(displayValue) / 100);
                    output(displayValue);
                    break;
                default:
                    break;
            }
    }
    output(displayValue);
    } else { // if area of keyContainer having no value is selected
        displayValue += '';
    }
})

// check what it is (number, operator or extra)

// if number, display the number

// if operator, process the number and store, display

// if extra, manipulate the number in display and store it

// TODO: '=' dabda previous memory accumulator ko value aaucha, we want the display value to keep being displayed instead.

// TODO: when adding any number other than numeric, it shows NaN, instead, show 'Not Computable' or sth
//       eg: adding 5 + '.'
//       I think the solution can be completely removing the capability of adding '.'