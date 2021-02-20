import fetch from "jest-fetch-mock"

import * as Colors from "../../src/colors"
import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

const getRandomColorSpy = jest.spyOn(Colors, "getRandomColor")
getRandomColorSpy.mockReturnValue("purple")

test("sets multiple colors", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    hue.setColors(ids, "purple")

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({
                    xy: Colors.colors.purple,
                    effect: "none",
                }),
            },
        )
    })
})

test("sets multiple colors to random", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))

    const ids = ["1", "2", "3"]
    hue.setColors(ids, "random")

    expect(getRandomColorSpy).toHaveBeenCalledTimes(1)
    expect(getRandomColorSpy).toHaveReturnedWith("purple")

    expect(fetch).toHaveBeenCalledTimes(3)

    ids.forEach(id => {
        expect(fetch).toHaveBeenCalledWith(
            `http://${hue.ip}/api/${hue.username}/lights/${id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({
                    xy: Colors.colors.purple,
                    effect: "none",
                }),
            },
        )
    })
})
