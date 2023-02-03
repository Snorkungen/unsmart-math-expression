import parse, { Parsed } from "../src/parse";


describe("Math Parser", () => {

    test("I wanna see something", () => {

        let parsed = parse("2 + 2 + 4")
        let expected = [2, "+", 2, "+", 4]

        expect(parsed).toStrictEqual(expected)
    });

    test("I wanna see something 2", () => {
        let parsed = parse("2 + (2 + 4)")
        let expected: Parsed = [2, "+", [2, "+", 4]]

        expect(parsed).toStrictEqual(expected);

        parsed = parse("3 + 3 +3 +(3 + 3 + (2 + 2)) + 2")
        expected = [3, "+", 3, "+", 3, "+", [3, "+", 3, "+", [2, "+", 2]], "+", 2];
         
        expect(parsed).toStrictEqual(expected)
    })

})