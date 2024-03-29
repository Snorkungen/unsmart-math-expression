import calculate from "../src/calculate"
import { Parsed } from "../src/parse"


describe("Calculate", () => {

    test("Test 1", () => {
        let parsed: Parsed = [2, "*", 2],
            calculated = calculate(parsed),
            expected = 4;

        expect(calculated).toBe(expected);
    });

    test("Test 2", () => {
        let parsed: Parsed = [1, "+", 2, "/", 2, "+", 4],
            calculated = calculate(parsed),
            expected = 6;

        expect(calculated).toBe(expected);
    })

    test("Test 3", () => {
        let parsed: Parsed = [[2, "+", 2], "/", 2, "+", 4],
            calculated = calculate(parsed),
            expected = 6;

        expect(calculated).toBe(expected);
    })

    test("Test 4", () => {
        let parsed: Parsed = [2, "*", 2, "^", [2, "^", 2, "+", 16, "/", 8], "+", 4],
            calculated = calculate(parsed),
            expected = 132;

        expect(calculated).toBe(expected);
    })

    test("Test calculating starting with \"+\"", () => {
        let parsed: Parsed = ["+", 2], expected = 2;
        expect(calculate(parsed)).toBe(expected);

        parsed = ["+", 2, "-", 2, "+", 2], expected = 2;
        expect(calculate(parsed)).toBe(expected)

        parsed = ["+", 2, "-", 2, "+", ["+", 2]], expected = 2;
        expect(calculate(parsed)).toBe(expected)
    })

    test("Test calculating starting with \"-\"", () => {
        let parsed: Parsed = ["-", 2], expected = -2;
        expect(calculate(parsed)).toBe(expected)

        parsed = [["-", 2, "*", 2], "+", 6], expected = 2;
        expect(calculate(parsed)).toBe(expected)
    })

    test("Test Failing case;  bad input", () => {
        let parsed: Parsed = [2, "+"]
        expect(() => calculate(parsed)).toThrow()

    })
})