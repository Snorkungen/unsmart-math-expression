import { Parsed, OPERATORS } from ".";

/*
    Ideas

    error messages 
        - Unexpected value: <value type>
        - Invalid value at position: value
*/

export type ValidateResponse<T> = {
    data: T;
} & ({
    valid: true;
} | {
    valid: false;
    error: {
        pos: number;
        msg: string;
    }
});

export const error_msg_unexpectedValue = (value: Parsed[number]) => `Unexpected value: "${value}"`;

function validateParsed(parsed: Parsed, prevValue?: Parsed[number]): ValidateResponse<typeof parsed> {

    for (let i = 0; i < parsed.length; i++) {
        let value = parsed[i];

        // check last
        if (i === parsed.length - 1 && typeof value === "string") {
            return {
                valid: false,
                data: parsed,
                error: {
                    pos: i,
                    msg: error_msg_unexpectedValue(value)
                }
            }
        }   

        if (Array.isArray(value)) {
            let validated = validateParsed(value, undefined);

            if (!validated.valid) {
                return validated;
            }

            prevValue = value;
            continue;
        }


        if (prevValue && (
            // 2, 2
            (typeof prevValue === "number" && typeof value === "number") ||
            // *, *
            (typeof prevValue === "string" && typeof value === "string") ||
            // [2], 2
            (typeof prevValue === "object" && typeof value === "number")
        )) {
            return {
                valid: false,
                data: parsed,
                error: {
                    pos: i,
                    msg: error_msg_unexpectedValue(value)
                }
            }
        }


        if (i === 0 && (
            value == "*" ||
            value == "/" ||
            value == "^"
        )) {
            // Check first position
            return {
                valid: false,
                data: parsed,
                error: {
                    pos: i,
                    msg: error_msg_unexpectedValue(value)
                }
            }
        }

        prevValue = value;
    }


    // Return when no problems
    return {
        valid: true,
        data: parsed
    }
}

export default function validate(data: Parsed | string): ValidateResponse<typeof data> {


    if (typeof data != "string") {
        return validateParsed(data);
    }


    throw new Error("Validating strings not implemented")
}