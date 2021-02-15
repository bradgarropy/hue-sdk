import fetch from "jest-fetch-mock"
import hue from "../utils/hue"
import {updateResponse} from "../utils/mocks"

const spy = jest.spyOn(hue, "setLightToColorLoop")
spy.mockImplementation(() => Promise.resolve())

test("sets lights to color loop", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    hue.setLightsToColorLoop(["1", "2", "3"])

    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith("1", undefined)
    expect(spy).toHaveBeenCalledWith("2", undefined)
    expect(spy).toHaveBeenCalledWith("3", undefined)
})
test("sets lights to color loop for duration", async () => {
    fetch.mockResponse(JSON.stringify(updateResponse))
    hue.setLightsToColorLoop(["1", "2", "3"], 5000)

    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith("1", 5000)
    expect(spy).toHaveBeenCalledWith("2", 5000)
    expect(spy).toHaveBeenCalledWith("3", 5000)
})

