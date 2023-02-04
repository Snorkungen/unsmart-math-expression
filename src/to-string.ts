import { Parsed } from ".";


export default function toString(parsed: Parsed): string {
    let str = "";

    for (let val of parsed) {
        if (Array.isArray(val)) {
            str += `(${toString(val)})`
        } else {
            str += val;
        };
    }

    return str;
}