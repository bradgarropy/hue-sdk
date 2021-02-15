import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("turns off a light", async () => {
    fetch.mockResponseOnce(JSON.stringify(updateResponse))
    hue.turnOffLight("1")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({on: false}),
        },
    )
})
