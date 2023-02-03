import makeNum from "./make-num";

export type Parsed = Array<string | number | Parsed>

export default function parse(expr: string): Parsed {
    let pos = 0;
    let parsed: Parsed = [];

    while (pos < expr.length) {
        let char = expr[pos];

        if (char == "+") {
            let num = makeNum(expr.slice(0, pos));
            parsed.push(num, char);

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


    console.log(parsed)

    return parsed;
}
