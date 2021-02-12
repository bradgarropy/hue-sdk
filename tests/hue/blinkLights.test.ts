import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {rawLight} from "../utils/mocks"

test("blinks multiple lights", async () => {
    fetch.mockResponse(JSON.stringify(rawLight))

    const ids = ["1", "2", "3"]
    await hue.blinkLights(ids, 100, 2)

    expect(fetch).toHaveBeenCalledTimes(15)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}`,
            {
                method: "GET",
            },
        )
    })

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: false}),
            },
        )

        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })
})

test("blinks multiple lights with default values", async () => {
    fetch.mockResponse(JSON.stringify(rawLight))

    const ids = ["1", "2", "3"]
    await hue.blinkLights(ids)

    expect(fetch).toHaveBeenCalledTimes(9)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}`,
            {
                method: "GET",
            },
        )
    })

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: false}),
            },
        )

        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })
})
