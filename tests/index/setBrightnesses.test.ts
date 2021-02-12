import fetch from "jest-fetch-mock"

import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

test("sets multiple brightnesses", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    hue.setBrightnesses(ids, 200)

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({bri: 200}),
            },
        )
    })
})
