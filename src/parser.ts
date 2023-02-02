type Operation = (n1: number, n2: number) => number;


const OPERATORS = {
    "add": {
        operation: (n1: number, n2: number) => n1 + n2,
        match: "+"
    },
    "subtract": {
        operation: (n1: number, n2: number) => n1 - n2,
        match: "-"
    }
} as const;

type OperatorNames = keyof typeof OPERATORS;

function makeNum(str: string) {
    return Number(str.trim())
}

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