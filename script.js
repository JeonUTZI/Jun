const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) append(value);
    if (action === "clear") clearDisplay();
    if (action === "backspace") backspace();
    if (action === "calculate") calculate();
    if (action === "factorial") factorial();
  });
});

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function factorial() {
  const n = Number(display.value);

  if (n < 0 || !Number.isInteger(n)) {
    display.value = "Error";
    return;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  display.value = result;
}

function calculate() {
  try {
    let expression = display.value;

    expression = expression
      .replaceAll("pi", "Math.PI")
      .replaceAll("e", "Math.E")
      .replaceAll("sin", "Math.sin")
      .replaceAll("cos", "Math.cos")
      .replaceAll("tan", "Math.tan")
      .replaceAll("sqrt", "Math.sqrt")
      .replaceAll("log", "Math.log10")
      .replaceAll("ln", "Math.log")
      .replaceAll("^", "**")
      .replaceAll("%", "/100");

    display.value = Function('"use strict"; return (' + expression + ")")();
  } catch {
    display.value = "Error";
  }
}