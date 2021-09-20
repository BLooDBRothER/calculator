import { stack } from "./stack.js";

function evaluateTwoNumbers(no1, no2, op){
    let answer;
    switch(op){
        case '+': answer = no1 + no2;
        break;
        case '-': answer = no1 - no2;
        break;
        case '*': answer = no1 * no2;
        break;
        case '/': answer = no1 / no2;
        break;
        case '^': answer = Math.pow(no1, no2);
    }
    return parseFloat((answer).toFixed(8));
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

export function evaluateExpression(expression){
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
    return no.top();
}