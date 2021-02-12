import fetch from "jest-fetch-mock"

import * as Colors from "../../src/colors"
import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

const getRandomColorSpy = jest.spyOn(Colors, "getRandomColor")
getRandomColorSpy.mockReturnValue("purple")

test("sets multiple random colors", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    hue.setRandomColors(ids)

    expect(getRandomColorSpy).toHaveBeenCalledTimes(1)
    expect(getRandomColorSpy).toHaveReturnedWith("purple")

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({xy: Colors.colors.purple}),
            },
        )
    })
})
