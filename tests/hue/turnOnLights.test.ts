import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("turns on multiple lights", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    hue.turnOnLights(ids)

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })
})
