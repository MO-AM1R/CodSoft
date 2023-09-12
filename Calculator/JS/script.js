let result = 0;
let op;

function resetButtons() {
  const buttons = document.querySelectorAll(".calculatorBtn.operator");
  buttons.forEach((element) => {
    element.classList.remove("active");
  });
}

function ifOperation() {
  const buttons = document.querySelectorAll(".calculatorBtn.operator");
  for (const element of buttons) {
    if (element.classList.contains("active")) {
      return true;
    }
  }
  return false;
}

function calc() {
  let output = document.getElementById("output");

  if (op == "×") {
    output.value *= result;
  }
  if (op == "÷") {
    if (output.value == 0) {
      output.value = "Error";
      return;
    }
    output.value = result / output.value;
  }
  if (op == "−") {
    output.value = result - output.value;
  }
  if (op == "+") {
    if (!Number.isInteger(output.value) || !Number.isInteger(result)) {
      output.value = parseFloat(result) + parseFloat(output.value);
    } else {
      output.value = result + output.value;
    }
  }
}

function handleOutput(element) {
  let output = document.getElementById("output");

  if (output.value == "Error" && !Number.isNaN(element) && element != "C") {
    return;
  }
  if (element == "=") {
    if (ifOperation()) {
      calc();
      resetButtons();
      result = 0;
    }
  } else if (element == "C") {
    if (output.value == 0 && output.value.length == 1) {
      resetButtons();
      output.value = result;
      result = 0;
      return;
    }
    output.value = 0;
  } else if (element == "+/-") {
    output.value *= -1;
  } else if (element == "%") {
    output.value /= 100;
  } else if (output.value == 0 && element != ".") {
    if (output.value.length == 1) {
      output.value = element;
    } else {
      output.value += element;
    }
  } else if (element === ".") {
    if (output.value.includes(".")) {
      return;
    } else {
      output.value += element;
    }
  } else {
    output.value += element;
  }
}

function active(button) {
  if (result == 0) {
    let output = document.getElementById("output");

    if (output.value == "Error") {
      return;
    }
    result = output.value;
    output.value = 0;
    op = button.textContent;
  } else {
    op = button.textContent;
  }

  if (button.classList.contains("active")) {
    button.classList.remove("active");
    return;
  }
  resetButtons();
  button.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", async function () {
  const buttons = document.querySelectorAll(".calculatorBtn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (button.classList.contains("operator")) {
        active(button);
      } else {
        if (button.classList.contains("flash")) {
          button.classList.remove("flash");
          setTimeout(() => {
            button.classList.add("flash");
          }, 10);
        } else {
          button.classList.add("flash");
        }
        handleOutput(button.textContent);
      }
    });
  });
});
