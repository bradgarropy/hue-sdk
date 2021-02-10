import fetch from "jest-fetch-mock"

import Hue from "../src"
import {generateLights, generateRawLights} from "./generators"
import {light, rawLight, updateResponse} from "./mocks"

const ip = "127.0.0.1"
const username = "bradgarropy"

describe("Hue", () => {
    let hue: Hue

    beforeEach(() => {
        hue = new Hue(ip, username)
    })

    test("creates hue instance", () => {
        expect(hue.api).toEqual(`http://${ip}/api/${username}`)
    })

    test("reads a light", async () => {
        fetch.mockResponseOnce(JSON.stringify(rawLight))
        const result = await hue.readLight("1")

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1`,
            {
                method: "GET",
            },
        )

        expect(result).toEqual(light)
    })

    test("reads all lights", async () => {
        fetch.mockResponseOnce(JSON.stringify(generateRawLights()))
        const lights = await hue.readLights()

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights`,
            {
                method: "GET",
            },
        )

        expect(lights).toEqual(generateLights())
    })

    test("updates a light", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.updateLight("1", {on: false})

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: false}),
            },
        )
    })

    test("turns on a light", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.turnOnLight("1")

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })

    test("turns on multiple lights", async () => {
        fetch.mockResponse(JSON.stringify(updateResponse))

        const ids = ["1", "2", "3"]
        hue.turnOnLights(ids)

        expect(fetch).toHaveBeenCalledTimes(3)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: true}),
                },
            )
        })
    })

    // test("turns on all lights", async () => {})

    test("turns off a light", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.turnOffLight("1")

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: false}),
            },
        )
    })

    test("turns off multiple lights", async () => {
        fetch.mockResponse(JSON.stringify(updateResponse))

        const ids = ["1", "2", "3"]
        hue.turnOffLights(ids)

        expect(fetch).toHaveBeenCalledTimes(3)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: false}),
                },
            )
        })
    })

    // test("turns off all lights", async () => {})
    // test("blinks a light", async () => {})
    // test("blinks multiple lights", async () => {})
    // test("sets a brightness", async () => {})
    // test("sets multiple brightnesses", async () => {})
    // test("sets a color", async () => {})
    // test("sets multiple colors", async () => {})
    // test("sets a random color", async () => {})
    // test("sets multiple random colors", async () => {})
})
