let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');


function appendNumber(number) {

    if (number === '.' && currentOperand.includes('.')) {
        return;
    }

    currentOperand += number;

    updateDisplay();
}


function chooseOperation(selectedOperation) {

    if (currentOperand === '' && previousOperand === '') {
        return;
    }

    if (currentOperand === '' && previousOperand !== '') {
        operation = selectedOperation;
        updateDisplay();
        return;
    }

    if (previousOperand !== '') {
        compute();
    }

    operation = selectedOperation;

    previousOperand = currentOperand;
    currentOperand = '';

    updateDisplay();
}


function compute() {

    if (previousOperand === '' || currentOperand === '' || !operation) {
        return;
    }

    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {

        case '+':
            result = previous + current;
            break;

        case '-':
            result = previous - current;
            break;

        case '×':
            result = previous * current;
            break;

        case '÷':

            if (current === 0) {
                currentOperand = 'Error';
                previousOperand = '';
                operation = undefined;
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        case '%':
            result = previous % current;
            break;

        default:
            return;
    }

    currentOperand = roundResult(result);
    previousOperand = '';
    operation = undefined;

    updateDisplay();
}


function roundResult(number) {

    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
}


function clearCalculator() {

    currentOperand = '';
    previousOperand = '';
    operation = undefined;

    updateDisplay();
}


function deleteNumber() {

    if (currentOperand === 'Error') {
        clearCalculator();
        return;
    }

    currentOperand = currentOperand.slice(0, -1);

    updateDisplay();
}


function updateDisplay() {

    currentOperandElement.innerText =
        currentOperand === '' ? '0' : currentOperand;

    if (operation && previousOperand !== '') {

        previousOperandElement.innerText =
            `${previousOperand} ${operation}`;

    } else {

        previousOperandElement.innerText = '';
    }
}


// Keyboard support

document.addEventListener('keydown', function(event) {

    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }

    else if (key === '.') {
        appendNumber('.');
    }

    else if (key === '+') {
        chooseOperation('+');
    }

    else if (key === '-') {
        chooseOperation('-');
    }

    else if (key === '*') {
        chooseOperation('×');
    }

    else if (key === '/') {
        event.preventDefault();
        chooseOperation('÷');
    }

    else if (key === '%') {
        chooseOperation('%');
    }

    else if (key === 'Enter' || key === '=') {
        compute();
    }

    else if (key === 'Backspace') {
        deleteNumber();
    }

    else if (key === 'Escape') {
        clearCalculator();
    }

});