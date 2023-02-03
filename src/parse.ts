import makeNum from "./make-num";

export type Parsed = Array<string | number | Parsed>


export default function parse(expr: string): Parsed {
    let pos = 0;
    let parsed: Parsed = [];

    while (pos < expr.length) {
        let char = expr[pos];


        if (char == "(") {
            let startPos = pos;
            let depth = 0;

            /* 
                Add some logic for multiplication shorthand
            */

            while (pos < expr.length) {
                char = expr[pos];



                if (char == "(") {
                    depth++;
                } else if (char == ")") {
                    depth--

                    if (depth == 0) {
                        let subExpr = expr.slice(startPos + 1, pos),
                        subParsed = parse(subExpr);

                        parsed.push(subParsed);

                        expr = expr.substring(pos + 1);                        
                        pos = 0;
                        break;
                    }

                }

                pos++;
            }

        }

        if (char == "+") {
            console.log(expr)
            let numExpr = expr.slice(0, pos);
            if (numExpr) {
                let num = makeNum(numExpr);
                parsed.push(num, char);
            }
            
            expr = expr.substring(pos + 1);

            pos = 0;
            continue;
        }

        pos++;

        if (pos == expr.length) {
            let lastNum = makeNum(expr);
            parsed.push(lastNum);
        }
    }

    return parsed;
}
