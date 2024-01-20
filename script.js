let totalNumber = 0;
let buffer = "0";
let previousPickOperator;

const display = document.querySelector(".display");

const buttonClick = (value) => {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  display.innerText = buffer;
};
const handleSymbol = (symbol) => {
  switch (symbol) {
    case "C":
      console.log("clear");
      buffer = "0";
      totalNumber = 0;
      break;
    case "=":
      if (previousPickOperator === null) {
        return;
      }
      cancelOperation(parseInt(buffer));
      previousPickOperator = null;
      buffer = totalNumber.toString();
      totalNumber = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "÷":
    case "×":
      handleMath(symbol);
      break;
  }
};
const handleMath = (symbol) => {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (totalNumber === 0) {
    totalNumber = intBuffer;
  } else {
    cancelOperation(intBuffer);
  }
  previousPickOperator = symbol;
  buffer = "0";
};

const cancelOperation = (intBuffer) => {
  switch (previousPickOperator) {
    case "+":
      totalNumber += intBuffer;
      break;
    case "-":
      totalNumber -= intBuffer;
      break;
    case "÷":
      totalNumber /= intBuffer;
      break;
    case "×":
      totalNumber *= intBuffer;
      break;
  }
};
const handleNumber = (numberString) => {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
};
const initializing = () => {
  const calcButtons = document.querySelectorAll(".calc-button");
  calcButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      buttonClick(event.target.innerHTML);
    });
  });
};

initializing();
