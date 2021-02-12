import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {light, rawLight, updateResponse} from "../utils/mocks"

test("blinks a light", async () => {
    fetch.mockResponseOnce(JSON.stringify(rawLight))
    fetch.mockResponseOnce(JSON.stringify(updateResponse))
    fetch.mockResponseOnce(JSON.stringify(updateResponse))

    await hue.blinkLight("1")

    expect(fetch).toHaveBeenCalledTimes(3)

    expect(fetch).toHaveBeenNthCalledWith(
        1,
        `http://${hue.ip}/api/${hue.username}/lights/1`,
        {
            method: "GET",
        },
    )

    expect(fetch).toHaveBeenNthCalledWith(
        2,
        `http://${hue.ip}/api/${hue.username}/lights/${light.id}/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: false}),
        },
    )

    expect(fetch).toHaveBeenNthCalledWith(
        3,
        `http://${hue.ip}/api/${hue.username}/lights/${light.id}/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: true}),
        },
    )
})
