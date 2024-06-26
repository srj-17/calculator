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
                break;
        }
        return String(result);
    }, 
    
    full() {
        return this.accumulator && this.secondNumber && this.operator;
    }
}

function operatorKeyContains(value) {
    let yes = operatorKeys.reduce((containsDisplayValue, operatorKey) => {
                return (operatorKey.value === value) ? containsDisplayValue || true : containsDisplayValue || false;  
            }, false);
    return yes;
}

// receive a button press
keyContainer.addEventListener('click', (press) => {
    value = press.target.value;
    if (operatorKeyContains(displayValue)) {
        displayValue = '';
    } 
    if (numKeys.includes(press.target)) {
        displayValue = displayValue.concat(value);
        output(displayValue);
    } else if (operatorKeys.includes(press.target)) {
        if (value === '=') {
            if (!memory.accumulator) {
                displayValue = 'Not Calculable';
            } // else if (!displayValue) {
                // displayValue = 'Not Calculable';
                // even if displayValue is Null, or '', it should return correct result as a + 0 = a
            // }
            else {
                [memory.accumulator, memory.secondNumber] = 
                [memory.operate(memory.operator, memory.accumulator, displayValue), null];
                displayValue = memory.accumulator;
            }
            output(displayValue);
        } else {
            if (!memory.accumulator) {
                memory.accumulator = displayValue;
                memory.secondNumber = null;
                memory.operator = value;
            } else if (!memory.secondNumber) {
                memory.secondNumber = displayValue;
                memory.operator = value;
            } else {
                [memory.accumulator, memory.secondNumber] = 
                [memory.operate(memory.operator, memory.accumulator, memory.secondNumber), null];
                memory.operator = value;
                displayValue = memory.accumulator;
            }
            displayValue = value; // next time accessed, if displayValue is seen value, 
                                      // then empty display
                                    }
        } else if (extraKeys.includes(press.target)) {
            console.log("oooohooohohoh todo");
}
})

// check what it is (number, operator or extra)

// if number, display the number

// if operator, process the number and store, display

// if extra, manipulate the number in display and store it

