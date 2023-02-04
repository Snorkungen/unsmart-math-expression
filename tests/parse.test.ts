import parse from "../src/parse";


describe("Math Parser", () => {

    test("Test 1", () => {
        let parsed = parse("2 + 2 - 4");
        let expected = [2, "+", 2, "-", 4];

        expect(parsed).toStrictEqual(expected)
    });

    test("Test 2", () => {
        let parsed = parse("[3 + 3] +3 +(3 + 3 + (2 + 2)) + 2"),
            expected = [[3, "+", 3], "+", 3, "+", [3, "+", 3, "+", [2, "+", 2]], "+", 2];

        expect(parsed).toStrictEqual(expected)
    });

    test("Test 3", () => {
        let parsed = parse("3.4 * 1 ^ 2 / 2"),
            expected = [3.4, "*", 1, "^", 2, "/", 2]

        expect(parsed).toStrictEqual(expected);
    });
})