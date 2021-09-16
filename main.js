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

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        
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
    "=": buttons[20]
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