import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("color loops multiple lights", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    await hue.colorLoopLights(ids, 2500)

    expect(fetch).toHaveBeenCalledTimes(6)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true, effect: "colorloop"}),
            },
        )
    })

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({effect: "none"}),
            },
        )
    })
})

test("color loops multiple lights with default values", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    await hue.colorLoopLights(ids)

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true, effect: "colorloop"}),
            },
        )
    })
})
