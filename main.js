const buttons = document.querySelectorAll(".button");
const expressionCnt = document.querySelector(".expression");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(e.target.innerText === "A/C"){
            expressionCnt.innerText = '';
            return;
        };
        expressionCnt.innerText += e.target.innerText;
        expressionCnt.scrollTop = expressionCnt.scrollHeight;
    });
});

let valid = {
    "=": "=",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "^": "^",
    "(": "(",
    ")": ")",
    ".": "."
}

window.addEventListener("keydown", (e) => {
    if(e.key === "Backspace"){
        expressionCnt.innerText = expressionCnt.innerText.slice(0, expressionCnt.innerText.length-1);
    }
    if((e.key>="0" && e.key<="9") || valid[e.key]){
        expressionCnt.innerText += e.key;
        expressionCnt.scrollTop = expressionCnt.scrollHeight;
    }
});