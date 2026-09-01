const display = document.getElementById('display');
let currentExpression = '';

function appendNumber(num) {
  currentExpression += num;
  display.value = currentExpression;
}

function appendOperator(op) {
  if (currentExpression === '') return;
  const lastChar = currentExpression.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentExpression = currentExpression.slice(0, -1);
  }
  currentExpression += op;
  display.value = currentExpression;
}

function clearDisplay() {
  currentExpression = '';
  display.value = '';
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  display.value = currentExpression;
}

async function calculateResult() {
  const match = currentExpression.match(/^(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)$/);

  if (!match) {
    display.value = 'Error';
    currentExpression = '';
    return;
  }

  const [, num1, operator, num2] = match;

  try {
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ num1, num2, operator })
    });

    const data = await response.json();

    if (data.error) {
      display.value = data.error;
      currentExpression = '';
    } else {
      display.value = data.result;
      currentExpression = String(data.result);
    }
  } catch (err) {
    display.value = 'Error';
    currentExpression = '';
  }
}
