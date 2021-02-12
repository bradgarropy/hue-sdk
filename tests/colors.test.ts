import {colors, getColor, getRandomColor} from "../src/colors"
import {Color} from "../src/types"

describe("getColor", () => {
    test("translates a color to xy", () => {
        const keys = Object.keys(colors) as Color[]

        keys.forEach(color => {
            const xyColor = getColor(color)
            expect(xyColor).toEqual(colors[color])
        })
    })
})

describe("getRandomColor", () => {
    test("chooses a random color", () => {
        const color = getRandomColor()
        const keys = Object.keys(colors)

        expect(keys).toContain(color)
    })
})
