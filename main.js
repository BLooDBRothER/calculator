import { stack } from "./Module/stack.js";

const buttons = document.querySelectorAll(".button");
const expressionCnt = document.querySelector(".expression");

const dotRe = /\.[\d]{5,}/gi
const regex = {
    startingCondition: /^[^\d(]/gi,
    // doubleDot: /[\.]{2,}/gi,
    ipDot: /\.[\d]*\./gi,
    dotAfterOperator: /[+\-*\/\^\.][+\-*\/\^\.]/gi,
    wholeDigit: /[\d]{9,}/gi,
    decimalDigit: /\.[\d]{5,}/gi,
    operators: /[+\-*\/\^]{2,}/gi
}

function evaluateTwoNumbers(no1, no2, op){
    switch(op){
        case '+': return no1 + no2;
        case '-': return no1 - no2;
        case '*': return no1 * no2;
        case '/': return no1 / no2;
    }
}

function isNumber(val){
    return ((val >= "0" && val <= "9") || val === '.') ? true : false;
}

function operatorPrecedence(op){
    if(op === '+' || op === '-'){
        return 1;
    }
    if(op === '*' || op === '/'){
        return 2;
    }
    if(op === '^'){
        return 3;
    }
    return -1;
}

function evaluateExpression(expression){
    let i;
    const op = new stack(),
    no = new stack();
    for(i=0; i<expression.length; i++){
        if(expression[i] === '('){
            op.push(expression[i]);
        }
        else if(expression[i] === ')'){
            while(!op.isEmpty() && op.top() !== '('){
                let no2 = no.pop();
                let no1 = no.pop();
                let ope = op.pop();
                no.push(evaluateTwoNumbers(no1, no2, ope));
            }
            op.pop();
        }
        else if(isNumber(expression[i])){
            let val='';
            while(i<expression.length && isNumber(expression[i])){
                val += expression[i];
                i++;
            }
            no.push(parseFloat(val));
            i--;
        }
        else{
            while(!op.isEmpty() && operatorPrecedence(op.top()) >= operatorPrecedence(expression[i])){
                let no2 = no.pop();
                let no1 = no.pop();
                let ope = op.pop();
                no.push(evaluateTwoNumbers(no1, no2, ope));
            }
            op.push(expression[i]);
        }
    }
    while(!op.isEmpty()){
        let no2 = no.pop();
        let no1 = no.pop();
        let ope = op.pop();
        no.push(evaluateTwoNumbers(no1, no2, ope));
    }
    console.log(no.top());
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        
        if(e.target.innerText === "="){
            evaluateExpression(expressionCnt.innerText);
            return;
        }

        if(e.target.innerText === "A/C"){
            expressionCnt.innerText = '';
            return;
        };
        if(e.target.innerText === "CLEAR"){
            expressionCnt.innerText = expressionCnt.innerText.slice(0, expressionCnt.innerText.length-1);
            return;
        }
        expressionCnt.innerText += e.target.innerText;
        if(expressionCnt.innerText.match(regex.operators)){
            expressionCnt.innerText = expressionCnt.innerText.slice(0, expressionCnt.innerText.length-2);
            expressionCnt.innerText += e.target.innerText;

        }
        if(expressionCnt.innerText.match(regex["ipDot"]) || expressionCnt.innerText.match(regex.decimalDigit) || expressionCnt.innerText.match(regex.dotAfterOperator) || expressionCnt.innerText.match(regex.startingCondition) || expressionCnt.innerText.match(regex.wholeDigit)){
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