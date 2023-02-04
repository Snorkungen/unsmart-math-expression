import { Parsed } from "../src/parse";
import toString from "../src/to-string"

describe("to String", () => {
    test("Test 1", () => {
        let parsed: Parsed = [["-", 9], "+", 10],
            stringified = toString(parsed);
        let expected = "(-9)+10";
        
        expect(stringified).toBe(expected);
    })

    test("Test 2", () => {
        let parsed: Parsed = [2, "+", 2, "^", 4, "*", [2, "-", [1, "+", 1]]],
            stringified = toString(parsed);
        let expected = "2+2^4*(2-(1+1))";

        expect(stringified).toBe(expected);
    })
})