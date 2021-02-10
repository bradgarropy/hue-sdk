import {randomDecimal, randomInteger, sleep} from "../src/utils"

describe("random decimal", () => {
    test("chooses a random decimal", () => {
        const decimal = randomDecimal(1, 5)
        expect(decimal).toBeGreaterThanOrEqual(1)
        expect(decimal).toBeLessThanOrEqual(5)
    })
})

describe("random integer", () => {
    test("chooses a random decimal", () => {
        const integer = randomInteger(1, 5)
        expect(integer).toBeGreaterThanOrEqual(1)
        expect(integer).toBeLessThanOrEqual(5)
    })
})

describe("sleep", () => {
    test("sleeps", () => {
        const promise = sleep(100)
        expect(promise).resolves
    })
})
