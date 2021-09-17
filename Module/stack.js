export class stack{
    constructor(){
        this.data = [];
        this.size = 0;
    }
    push(value){
        this.data[this.size++] = value;
    }
    pop(){
        if(this.isEmpty()) return ; 
        let popValue = this.data[--this.size];
        return popValue;
    }
    top(){
        return this.data[this.size-1];
    }
    isEmpty(){
        return this.size === 0 ? false : true;
    }
}