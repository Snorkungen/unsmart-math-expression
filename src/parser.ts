import makeNum from "./make-num";

export default function parser(expr: string) {
    let pos = 0;
    
    let nums = [];
    let operators = [];
    
    while (pos < expr.length) {
        let char = expr[pos];
        
        if (char == "+") {
            nums.push(makeNum(expr.slice(0, pos)));
            operators.push(char);
            
            expr = expr.substring(pos + 1);
            
            pos = 0;
            continue;
        }
        
        pos++;
        
        if (pos == expr.length) {
            nums.push(makeNum(expr))
        }
    }
    
    let result = 0;



    console.log(result)

    return result;
}

parser("2+4+ 6 ")