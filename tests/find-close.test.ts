import findClose from "../src/find-close";

describe("Find close Bracket", () => {


    test("Test 1", () => {
        let expression = "( ) ()",
            pos = 0;
        let expected = 2;

        expect(findClose(expression, pos)).toBe((expected))
    })

    test("Test 2", () => {
        let expression = "(() ) ()",
            pos = 0;
        let expected = 4;

        expect(findClose(expression, pos)).toBe((expected))
    })

    test("Test 3", () => {
        let expression = "{(() () [] >><><< () ) ()}",
            pos = 0, expected = 25; //expression.length - 1;

        expect(findClose(expression, pos)).toBe((expected))
    })
})