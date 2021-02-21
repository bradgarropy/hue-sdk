import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("color loops a light", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    await hue.colorLoopLight("1", 2500)

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

test("color loop a light with default values", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    hue.colorLoopLight("1")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: true, effect: "colorloop"}),
        },
    )
})
