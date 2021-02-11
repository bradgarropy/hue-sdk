import fetch from "jest-fetch-mock"

import Hue from "../src"
import * as Colors from "../src/colors"
import {generateLights, generateRawLights} from "./generators"
import {light, rawLight, updateResponse} from "./mocks"

const ip = "127.0.0.1"
const username = "bradgarropy"

const getRandomColorSpy = jest.spyOn(Colors, "getRandomColor")
getRandomColorSpy.mockReturnValue("purple")

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

    test("turns on all lights", async () => {
        fetch.mockResponseOnce(JSON.stringify(generateRawLights()))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))

        await hue.turnOnAllLights()

        expect(fetch).toHaveBeenCalledTimes(4)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights`,
            {
                method: "GET",
            },
        )

        const lights = generateLights()

        lights.forEach(light => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${light.id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: true}),
                },
            )
        })
    })

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

    test("turns off all lights", async () => {
        fetch.mockResponseOnce(JSON.stringify(generateRawLights()))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))

        await hue.turnOffAllLights()

        expect(fetch).toHaveBeenCalledTimes(4)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights`,
            {
                method: "GET",
            },
        )

        const lights = generateLights()

        lights.forEach(light => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${light.id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: false}),
                },
            )
        })
    })

    test("blinks a light", async () => {
        fetch.mockResponseOnce(JSON.stringify(rawLight))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        fetch.mockResponseOnce(JSON.stringify(updateResponse))

        await hue.blinkLight("1", 500, 1)

        expect(fetch).toHaveBeenCalledTimes(3)

        expect(fetch).toHaveBeenNthCalledWith(
            1,
            `http://${ip}/api/${username}/lights/1`,
            {
                method: "GET",
            },
        )

        expect(fetch).toHaveBeenNthCalledWith(
            2,
            `http://${ip}/api/${username}/lights/${light.id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: false}),
            },
        )

        expect(fetch).toHaveBeenNthCalledWith(
            3,
            `http://${ip}/api/${username}/lights/${light.id}/state`,
            {
                method: "PUT",
                body: JSON.stringify({on: true}),
            },
        )
    })

    test("blinks multiple lights", async () => {
        fetch.mockResponse(JSON.stringify(rawLight))

        const ids = ["1", "2", "3"]
        await hue.blinkLights(ids, 500, 1)

        expect(fetch).toHaveBeenCalledTimes(9)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}`,
                {
                    method: "GET",
                },
            )
        })

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: false}),
                },
            )

            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({on: true}),
                },
            )
        })
    })

    test("sets a brightness", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.setBrightness("1", 200)

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({bri: 200}),
            },
        )
    })

    test("sets multiple brightnesses", async () => {
        fetch.mockResponse(JSON.stringify(updateResponse))

        const ids = ["1", "2", "3"]
        hue.setBrightnesses(ids, 200)

        expect(fetch).toHaveBeenCalledTimes(3)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({bri: 200}),
                },
            )
        })
    })

    test("sets a color", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.setColor("1", "purple")

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({xy: Colors.colors.purple}),
            },
        )
    })

    test("sets multiple colors", async () => {
        fetch.mockResponse(JSON.stringify(updateResponse))

        const ids = ["1", "2", "3"]
        hue.setColors(ids, "purple")

        expect(fetch).toHaveBeenCalledTimes(3)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({xy: Colors.colors.purple}),
                },
            )
        })
    })

    test("sets a random color", async () => {
        fetch.mockResponseOnce(JSON.stringify(updateResponse))
        hue.setRandomColor("1")

        expect(getRandomColorSpy).toHaveBeenCalledTimes(1)
        expect(getRandomColorSpy).toHaveReturnedWith("purple")

        expect(fetch).toHaveBeenCalledTimes(1)

        expect(fetch).toHaveBeenCalledWith(
            `http://${ip}/api/${username}/lights/1/state`,
            {
                method: "PUT",
                body: JSON.stringify({xy: Colors.colors.purple}),
            },
        )
    })

    test("sets multiple random colors", async () => {
        fetch.mockResponse(JSON.stringify(updateResponse))

        const ids = ["1", "2", "3"]
        hue.setRandomColors(ids)

        expect(getRandomColorSpy).toHaveBeenCalledTimes(1)
        expect(getRandomColorSpy).toHaveReturnedWith("purple")

        expect(fetch).toHaveBeenCalledTimes(3)

        ids.forEach(id => {
            expect(fetch).toHaveBeenCalledWith(
                `http://${ip}/api/${username}/lights/${id}/state`,
                {
                    method: "PUT",
                    body: JSON.stringify({xy: Colors.colors.purple}),
                },
            )
        })
    })
})
