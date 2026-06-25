let currentInput = "0";
let previousInput = "";
let operator = null;

const currentDisplay = document.getElementById("current-operand");
const previousDisplay = document.getElementById("previous-operand");

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    if (operator != null) {
        previousDisplay.innerText = `${previousInput} ${operator}`;
    } else {
        previousDisplay.innerText = "";
    }
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === "0" && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "0";
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentInput.length === 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = current === 0 ? "Error" : prev / current; break;
        case '%': computation = prev % current; break;
        default: return;
    }
    currentInput = computation.toString();
    operator = null;
    previousInput = "";
    updateDisplay();
}

// Keyboard Support
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/', '%'].includes(e.key)) appendOperator(e.key);
});