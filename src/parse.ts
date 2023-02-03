import findClose, { OPEN_BRACKETS } from "./find-close";
import makeNum from "./make-num";

const OPERATORS = ["+", "-"] as const;

export type Operator = typeof OPERATORS[number];
export type Parsed = Array<Operator | number | Parsed>;

export default function parse(expr: string): Parsed {
    let pos = 0;
    let parsed: Parsed = [];

    expr = expr.replace(/\s/g, "");

    while (pos < expr.length) {
        let char = expr[pos];
        let removePrev = false;

        if (OPEN_BRACKETS.includes(char)) {
            let closePos = findClose(expr, pos);
            let internalExpression = expr.slice(pos + 1, closePos);
            let internalParsed = parse(internalExpression);

            parsed.push(internalParsed);

            pos = closePos + 1;
            removePrev = true;
        }

        if (OPERATORS.includes(char as typeof OPERATORS[number])) {
            let prevExpr = expr.slice(0, pos);

            if (prevExpr) {
                let prevNum = makeNum(prevExpr);
                parsed.push(prevNum);
            }

            parsed.push(char as Operator);

            removePrev = true;
            pos++;
        }


        if (removePrev) {
            expr = expr.substring(pos);
            pos = 0;
        } else {
            pos++;
        }

        if (pos == expr.length) {
            if (!expr) break;
            // Last value in expression

            let num = makeNum(expr);
            parsed.push(num);
        }
    }

    return parsed;
}


parse("3 + 3 +3 +(3 + 3 + (2 + 2)) + 2")