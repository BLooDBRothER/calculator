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
window.addEventListener("keypress", (e) => {
    if((e.key>="0" && e.key<="9") || valid[e.key]){
        expressionCnt.innerText += e.key;
        expressionCnt.scrollTop = expressionCnt.scrollHeight;
    }
});