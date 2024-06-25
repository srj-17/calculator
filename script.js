// calculator operations
firstOperand = 4;
secondOperand = 4;

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

const operate(operator, firstOperand, secondOperand) {
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
}