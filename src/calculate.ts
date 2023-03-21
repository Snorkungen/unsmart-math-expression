import { Operator, Parsed } from "./parse";


function assertIsNumbers(num: Parsed[number]): asserts num is number {
    if (typeof num !== "number") {
        throw new Error("Invalid Value: " + num)
    }
}

export default function calculate(parsed: Parsed): number {
    /* 
        Order of operations
        calculate ^
        calculate * & /
        calculate + & -
        
        left to right
        */

    // calculate value of arrays

    for (let i = 0; i < parsed.length; i++) {
        let val = parsed[i];
        if (!Array.isArray(val)) continue;
        let calculated = calculate(val);
        parsed[i] = calculated;
    }

    // calculate ^
    for (let i = 0; i < parsed.length; i++) {
        const val = parsed[i];
        if (val !== "^") continue;

        let baseNum = parsed[i - 1],
            expoNum = parsed[i + 1];

        assertIsNumbers(baseNum), assertIsNumbers(expoNum);

        let calculated = Math.pow(baseNum, expoNum);
        parsed.splice(i - 1, 3, calculated)

        // prevent infinite loops
        if (i > 0) {
            // correct to new position 
            i--;
        }
    }

    for (let i = 0; i < parsed.length; i++) {
        let operand = parsed[i];
        if (!["*", "/"].includes(operand as string)) continue;
        let prevNum = parsed[i - 1],
            nextNum = parsed[i + 1];

        assertIsNumbers(prevNum), assertIsNumbers(nextNum);

        let calculated: number;

        if (operand == "*") calculated = prevNum * nextNum;
        else calculated = prevNum / nextNum;

        parsed.splice(i - 1, 3, calculated)

        // prevent infinite loops
        if (i > 0) {
            // correct to new position 
            i--;
        }
    }

    // calculate + & -
    for (let i = 0; i < parsed.length; i++) {
        let operand = parsed[i];
        if (!["+", "-"].includes(operand as string)) continue;

        // hacky solution to preventing infinite loops

        let prevNum = parsed[i - 1] || 0, // support stuff as ["-",2] = -2
            nextNum = parsed[i + 1];

        assertIsNumbers(prevNum), assertIsNumbers(nextNum);

        let calculated: number;

        if (operand == "+") calculated = prevNum + nextNum;
        else calculated = prevNum - nextNum;

        // support stuff as ["-",2] = -2
        if (i <= 0) {
            parsed.splice(0, 2, calculated)
        } else {
            parsed.splice(i - 1, 3, calculated);
        }
        
        // prevent infinite loops
        if (i > 0) {
            // correct to new position 
            i--;
        }
    }

    if (parsed.length === 1 && typeof parsed[0] == "number") {
        return parsed[0];
    }

    throw new Error("Calculation failed, invalid input: [" + parsed + "]")
}
