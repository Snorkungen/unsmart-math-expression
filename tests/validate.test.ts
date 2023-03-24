import { Parsed, } from "../src"
import validate, { error_msg_unexpectedValue } from "../src/validate";

/*
    Ideas

    error messages 
        - Unexpected value: <value type>
        - Invalid value at position: value
*/

describe("Test validate", () => {

    test("Validate valid parsed array", () => {
        let parsed: Parsed = [2, "*", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeTruthy();
        expect(validated.data).toBe(parsed)
    });

    test("Validate valid parsed array nested", () => {
        let parsed: Parsed = [2, "*", [3, "+", 2], "/", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeTruthy();
        expect(validated.data).toBe(parsed)
    });

    test("Validate valid parsed array start with '-'", () => {
        let parsed: Parsed = ["-", 2, "/", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeTruthy();
        expect(validated.data).toBe(parsed)
    });

    test("Validate invalid parsed array: unexpected value: number", () => {
        let parsed: Parsed = [2, 2, "*", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeFalsy();

        expect(validated).toEqual({
            valid: false,
            data: parsed,
            error: {
                pos: 1,
                msg: error_msg_unexpectedValue(2)
            }
        })
    });

    test("Validate invalid parsed array: unexpected value: operand", () => {
        let parsed: Parsed = [2, "*", "*", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeFalsy();

        expect(validated).toEqual({
            valid: false,
            data: parsed,
            error: {
                pos: 2,
                msg: error_msg_unexpectedValue("*")
            }
        })
    });

    test("Validate invalid parsed array: unexpected value: nested", () => {
        let parsed: Parsed = [[2, 2], "*", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeFalsy();

        expect(validated).toEqual({
            valid: false,
            data: parsed[0],
            error: {
                pos: 1,
                msg: error_msg_unexpectedValue(2)
            }
        })
    });

    test("Validate invalid parsed array: unexpected value: starts with '*'", () => {
        let parsed: Parsed = ["*",  2, "*", 3];
        let validated = validate(parsed);

        expect(validated.valid).toBeFalsy();

        expect(validated).toEqual({
            valid: false,
            data: parsed,
            error: {
                pos: 0,
                msg: error_msg_unexpectedValue("*")
            }
        })
    });

    test("Validate invalid parsed array: unexpected value: ends with '-'", () => {
        let parsed: Parsed =  ["-", 2, "*", 3, "-"];
        let validated = validate(parsed);

        expect(validated.valid).toBeFalsy();

        expect(validated).toEqual({
            valid: false,
            data: parsed,
            error: {
                pos: parsed.length - 1,
                msg: error_msg_unexpectedValue("-")
            }
        })
    });

})