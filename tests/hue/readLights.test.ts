import fetch from "jest-fetch-mock"

import {generateLights, generateRawLights} from "../utils/generators"
import hue from "../utils/hue"

test("reads all lights", async () => {
    fetch.mockResponseOnce(JSON.stringify(generateRawLights()))
    const lights = await hue.readLights()

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights`,
        {
            method: "GET",
        },
    )

    expect(lights).toEqual(generateLights())
})
