import hue from "../utils/hue"

test("creates a hue instance", () => {
    expect(hue.api).toEqual(`http://${hue.ip}/api/${hue.username}`)
})
