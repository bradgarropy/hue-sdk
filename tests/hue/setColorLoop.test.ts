import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("sets a light to color loop", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    hue.setColorLoop("1")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: true, effect: "colorloop"}),
        },
    )
})

test("sets a light to color loop for certain duration", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    await hue.setColorLoop("1", 3000)

    expect(fetch).toHaveBeenCalledTimes(2)

    expect(fetch).toHaveBeenNthCalledWith(
        1,
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: true, effect: "colorloop"}),
        },
    )

    expect(fetch).toHaveBeenNthCalledWith(
        2,
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({effect: "none"}),
        },
    )
})
