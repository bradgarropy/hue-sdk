import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {light, rawLight} from "../utils/mocks"

test("reads a light", async () => {
    fetch.mockResponseOnce(JSON.stringify(rawLight))
    const result = await hue.readLight("1")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights/1`,
        {
            method: "GET",
        },
    )

    expect(result).toEqual(light)
})
