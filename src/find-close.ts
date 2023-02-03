
export const OPEN_BRACKETS = ["(", "{", "["],
    CLOSE_BRACKETS = [")", "}", "]"];

export default function findClose(expression: string, startPos: number): number {
    let pos = startPos;
    let depth = 0;

    while (pos < expression.length) {
        let char = expression[pos];

        if (OPEN_BRACKETS.includes(char)) {
            depth++;
        } else if (CLOSE_BRACKETS.includes(char)) {
            depth--;
            if (depth === 0) {
                return pos;
            }
        }

        pos++;
    }

    throw new Error("No closing bracket found");
}