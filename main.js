import { evaluateExpression } from "./Module/evaluation.js";

const buttons = document.querySelectorAll(".button");
const expressionCnt = document.querySelector(".expression");

//regex condition match
const removeRegex = {
    startingCondition: /^[^\d\(]/gi,
    ipDot: /\.[\d\.]*\./gi,
    wholeDigit: /[\d]{9,}/gi,
    decimalDigit: /\.[\d]{5,}/gi,
    paranOperator: /\([+\-*\/\^]/gi,
    paranDigit: /[\d]\(`/gi,
    operatorParan: /[+\-*\/\^]\)/gi,
    paranOpenClose: /\(\)/gi,
    paranCloseOpen: /\)[\(\d\.]/gi,
}

const changeRegex = {
    operators: /[+\-*\/\^]{2,}/gi,
    dotAfterOperator: /\.[+\-*\/\^]/gi,
    operatorAfterDot: /[+\-*\/\^]\./gi,
    startingDot: /^\./gi,
}

function checkCondition(value){
    return Object.values(removeRegex).some(re => value.match(re));
}

//Paranthesis condition check
let count=0;
function checkParanthesis(value){
    console.log(count)
    return value === ')' && count <= 0 ? true : false;
}

function reverseParanthesisCount(value){
    let lastValue = value[value.length-1];
    if(lastValue === '('){
        count--;
    }
    else if(lastValue === ')'){
        count++;
    }
}

function countParanthesis(value){
    if(value === '('){
        count++;
    }
    else if(value === ')'){
        count--;
    }
}

function matchParanthesis(){
    while(count--){
        expressionCnt.innerText += ')';
    }
    count=0;
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(e.target.innerText === '(' || e.target.innerText === ')'){
            if(checkParanthesis(e.target.innerText)) return;
            countParanthesis(e.target.innerText);
        }
        if(e.target.innerText === "="){
            matchParanthesis();
            console.log(evaluateExpression(expressionCnt.innerText));
            return;
        }
        if(e.target.innerText === "A/C"){
            expressionCnt.innerText = '';
            return;
        };
        if(e.target.innerText === "CLEAR"){
            reverseParanthesisCount(expressionCnt.innerText);
            expressionCnt.innerText = expressionCnt.innerText.slice(0, expressionCnt.innerText.length-1);
            return;
        }
        expressionCnt.innerText += e.target.innerText;
        if(expressionCnt.innerText.match(changeRegex.startingDot)){
            expressionCnt.innerText = "0.";
        }
        else if(expressionCnt.innerText.match(changeRegex.dotAfterOperator)){
            expressionCnt.innerText = expressionCnt.innerText.slice(0, (expressionCnt.innerText.length-1));
            expressionCnt.innerText += `0${e.target.innerText}`;
        }
        else if(expressionCnt.innerText.match(changeRegex.operatorAfterDot) || expressionCnt.innerText.match(changeRegex.operatorAfterDot)){
            expressionCnt.innerText = expressionCnt.innerText.slice(0, (expressionCnt.innerText.length-1));
            expressionCnt.innerText += `0${e.target.innerText}`;
        }
        else if(checkCondition(expressionCnt.innerText)){
            reverseParanthesisCount(expressionCnt.innerText);
            expressionCnt.innerText = expressionCnt.innerText.slice(0, (expressionCnt.innerText.length-1));
        }
        // console.log(expressionCnt.innerText.match(regex["dotAfterOperator"])) 
        expressionCnt.scrollTop = expressionCnt.scrollHeight;
    });
});

let valid = {
    "A/C": buttons[0],
    "Backspace": buttons[1],
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
    "=": buttons[20],
    "Enter": buttons[20]
}

function addActiveElement(elem){
    elem.classList.add("active");
    setTimeout((e) => {
        elem.classList.remove("active");
    }, 100);
}

window.addEventListener("keydown", (e) => {
    if(valid[e.key]){
        addActiveElement(valid[e.key])
        valid[e.key].click();
    }
});