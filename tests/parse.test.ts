import parse from "../src/parse";


describe("Math Parser", () => {

    test("I wanna see something", () => {

        let parsed = parse("2 + 2 + 4")
        let expected = [2, "+", 2, "+", 4]

        expect(parsed).toStrictEqual(expected)
    })

})