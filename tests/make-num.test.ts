import makeNum from "../src/make-num"

describe("make num", () => {


    test("Return number", () => {
        expect(typeof makeNum("2")).toBe("number");
    });

    test("Parses int", () => {
        expect(makeNum("3")).toBe(3);
        expect(makeNum("4")).toBe(4);
        expect(makeNum("  3  ")).toBe(3)
    })


    test("Parses decimal", () => {
        expect(makeNum("3.3")).toBe(3.3);
        expect(makeNum("4.09")).toBe(4.09);
        expect(makeNum("  3 . 2 ")).toBe(3.2)
        expect(makeNum("  3 , 2 ")).toBe(3.2)
    })


})