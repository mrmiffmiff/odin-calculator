// there's a lot of work to do here but I'm moving on for now

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstOperand = null;
let operation = null;
let secondOperand = null;
let displayVal = "0";
let operatePushed = false;

function operate(op, a, b) {
    if (op === '+') return add(a, b);
    else if (op === '-') return subtract(a, b);
    else if (op === '*') return multiply(a, b);
    else if (op === '/') {
        if (b === 0) return "can you not";
        return divide(a, b);
    }
    else return "ERROR";
}

const screen = document.querySelector("#screen");

function updateDisplay() {
    screen.textContent = displayVal;
}

function parseDigit(digit) {
    if (operatePushed || displayVal === "0") {
        displayVal = digit.textContent;
    }
    else {
        displayVal = displayVal.concat(digit.textContent);
    }
    operatePushed = false;
    updateDisplay();
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener("click", function (e) {
        parseDigit(this);
    });
});

function callEquals() {
    let result = operate(operation, firstOperand, secondOperand);
    displayVal = result.toString();
    firstOperand = null;
    secondOperand = null;
    operation = null;
    updateDisplay();
}

const operations = document.querySelectorAll(".operation");
operations.forEach((op) => {
    op.addEventListener("click", function (e) {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayVal);
        }
        else if (secondOperand === null && !operatePushed) {
            secondOperand = parseFloat(displayVal);
            callEquals();
            firstOperand = parseFloat(displayVal);
        }
        operation = this.textContent;
        operatePushed = true;
    });
});

const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

equalButton.addEventListener("click", (e) => {
    if (firstOperand && operation) {
        secondOperand = parseFloat(displayVal);
        callEquals();
    }
    operatePushed = true;
});

clearButton.addEventListener("click", (e) => {
    firstOperand = null;
    operation = null;
    secondOperand = null;
    displayVal = "0";
    operatePushed = false;
    updateDisplay();
})

updateDisplay();