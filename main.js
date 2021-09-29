import { evaluateExpression } from "./Module/evaluation.js";

const err = document.querySelector(".wrapper");
const buttons = document.querySelectorAll(".button");
const expressionCnt = document.querySelector(".expression");
const answerCnt = document.querySelector(".preview");

//regex condition match
const removeRegex = {
  startingCondition: /^[^\d\(]/gi,
  ipDot: /\.[\d\.]*\./gi,
  dotParn: /\.\(/gi,
  wholeDigit: /[\d]{16,}/gi,
  decimalDigit: /\.[\d]{9,}/gi,
  paranOperator: /\([+\-*\/\^%]/gi,
  digitParan: /[\d]\(/gi,
  operatorParan: /[+\-*\/\^%]\)/gi,
  paranOpenClose: /\(\)/gi,
  paranCloseOpen: /\)[\(\d\.]/gi,
};

const changeRegex = {
  operators: /[+\-*\/\^%]{2,}/gi,
  dotAfterOperator: /\.[+\-*\/\^\)%]/gi,
  operatorAfterDot: /[+\-*\/\^\(%]\./gi,
  startingDot: /^\./gi,
  endCondition: /[+\-*\/\^%]$/gi,
  operatorAfteEval: /[+\-*\/\^%]/gi,
};

function checkCondition(value) {
  return Object.values(removeRegex).some((re) => value.match(re));
}

//Paranthesis condition check
let count = 0;
function checkParanthesis(value) {
  return value === ")" && count <= 0 ? true : false;
}

function reverseParanthesisCount(value) {
  let lastValue = value[value.length - 1];
  if (lastValue === "(") {
    count--;
  } else if (lastValue === ")") {
    count++;
  }
}

function countParanthesis(value) {
  if (value === "(") {
    count++;
  } else if (value === ")") {
    count--;
  }
}

function matchParanthesis() {
  while (count--) {
    expressionCnt.innerText += ")";
  }
  count = 0;
}

// live Preview
function dummyMatchParanthesis(tempExpression) {
  let temp = count;
  while (temp--) {
    tempExpression += ")";
  }
  return tempExpression;
}
function preview() {
  if (expressionCnt.innerText === "") {
    answerCnt.innerText = "";
    return;
  }
  let tempExpression = expressionCnt.innerText.match(changeRegex.endCondition)
    ? expressionCnt.innerText.slice(0, expressionCnt.innerText.length - 1)
    : expressionCnt.innerText;
  tempExpression = dummyMatchParanthesis(tempExpression);
  const answer = evaluateExpression(tempExpression);
  answerCnt.innerText = `${(answer === 0 || answer)? "=" + answer : answerCnt.innerText}`;
}

let isEvaluated = false;
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    err.dataset.err = "";
    if (e.target.innerText === "=") {
      if (
        expressionCnt.innerText.match(changeRegex.endCondition) ||
        expressionCnt.innerText === ""
      ) {
        err.dataset.err = "Invalid Expression";
        return;
      }
      matchParanthesis();
      const answer = evaluateExpression(expressionCnt.innerText);
      answerCnt.innerText = "=" + answer;
      expressionCnt.innerText = "";
      isEvaluated = true;
      return;
    }
    if (e.target.innerText === "A/C") {
      expressionCnt.innerText = answerCnt.innerText = "";
      count = 0;
      isEvaluated = false;
      return;
    }
    if (e.target.innerText === "CLEAR") {
      reverseParanthesisCount(expressionCnt.innerText);
      expressionCnt.innerText = expressionCnt.innerText.slice(
        0,
        expressionCnt.innerText.length - 1
      );
      preview();
      return;
    }
    if (isEvaluated && e.target.innerText.match(changeRegex.operatorAfteEval) && !answerCnt.innerText.includes("Infinity")) {
      let answerWholeDigitCount = answerCnt.innerText.match(/^=[\d]{16,}/);
      let answerDotDigitCount = answerCnt.innerText.match(/\.[\d]{9,}/);
      if(answerWholeDigitCount || answerDotDigitCount){
        answerCnt.innerText = "=0";
      }
      let returnAnswer = answerCnt.innerText.replace(/-/, "0-");
      expressionCnt.innerText = returnAnswer.slice(1, returnAnswer.length) + e.target.innerText;
      answerCnt.innerText = "";
      preview();
      isEvaluated = false;
      return;
    }
    if (e.target.innerText === "(" || e.target.innerText === ")") {
      if(isEvaluated) {
        answerCnt.innerText = '';
        isEvaluated = false;
      };
      if (checkParanthesis(e.target.innerText)) return;
      countParanthesis(e.target.innerText);
    }
    isEvaluated = false;
    expressionCnt.innerText += e.target.innerText;
    if (expressionCnt.innerText.match(changeRegex.startingDot)) {
      expressionCnt.innerText = "0.";
    } else if (expressionCnt.innerText.match(changeRegex.operators)) {
      expressionCnt.innerText = expressionCnt.innerText.slice(
        0,
        expressionCnt.innerText.length - 2
      );
      expressionCnt.innerText += e.target.innerText;
    } else if (
      expressionCnt.innerText.match(changeRegex.dotAfterOperator) ||
      expressionCnt.innerText.match(changeRegex.operatorAfterDot)
    ) {
      expressionCnt.innerText = expressionCnt.innerText.slice(
        0,
        expressionCnt.innerText.length - 1
      );
      expressionCnt.innerText += `0${e.target.innerText}`;
    } else if (checkCondition(expressionCnt.innerText)) {
      reverseParanthesisCount(expressionCnt.innerText);
      expressionCnt.innerText = expressionCnt.innerText.slice(
        0,
        expressionCnt.innerText.length - 1
      );
      err.dataset.err = "Invalid Key";
    }
    preview();
    expressionCnt.scrollTop = expressionCnt.scrollHeight;
  });
});

let valid = {
  "A/C": buttons[0],
  Backspace: buttons[1],
  "(": buttons[2],
  ")": buttons[3],
  "^": buttons[4],
  "+": buttons[5],
  "7": buttons[6],
  "8": buttons[7],
  "9": buttons[8],
  "-": buttons[9],
  "4": buttons[10],
  "5": buttons[11],
  "6": buttons[12],
  "*": buttons[13],
  "1": buttons[14],
  "2": buttons[15],
  "3": buttons[16],
  "/": buttons[17],
  ".": buttons[18],
  "0": buttons[19],
  "%": buttons[20],
  "=": buttons[21],
  "Enter": buttons[21],
};

function addActiveElement(elem) {
  elem.classList.add("active");
  setTimeout((e) => {
    elem.classList.remove("active");
  }, 100);
}

window.addEventListener("keydown", (e) => {
  if (valid[e.key]) {
    addActiveElement(valid[e.key]);
    valid[e.key].click();
  }
});
