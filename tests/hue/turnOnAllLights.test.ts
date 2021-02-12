import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {generateLights, generateRawLights} from "../utils/generators"
import {updateResponse} from "../utils/mocks"

test("turns on all lights", async () => {
    fetch.mockResponseOnce(JSON.stringify(generateRawLights()))
    fetch.mockResponseOnce(JSON.stringify(updateResponse))
    fetch.mockResponseOnce(JSON.stringify(updateResponse))
    fetch.mockResponseOnce(JSON.stringify(updateResponse))

    await hue.turnOnAllLights()

    expect(fetch).toHaveBeenCalledTimes(4)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights`,
        {
            method: "GET",
        },
    )

    const lights = generateLights()

    lights.forEach(light => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${light.id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })
})
