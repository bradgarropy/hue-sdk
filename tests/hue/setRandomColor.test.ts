import fetch from "jest-fetch-mock"

import * as Colors from "../../src/colors"
import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

const getRandomColorSpy = jest.spyOn(Colors, "getRandomColor")
getRandomColorSpy.mockReturnValue("purple")

test("sets a random color", async () => {
    fetch.mockResponseOnce(JSON.stringify(updateResponse))
    hue.setRandomColor("1")

    expect(getRandomColorSpy).toHaveBeenCalledTimes(1)
    expect(getRandomColorSpy).toHaveReturnedWith("purple")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(fetch).toHaveBeenCalledWith(
        `http://${hue.ip}/api/${hue.username}/lights/1/state`,
        {
            method: "PUT",
            body: JSON.stringify({effect: "none", xy: Colors.colors.purple}),
        },
    )
})
