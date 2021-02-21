import fetch from "node-fetch"

import {getColor, getRandomColor} from "./colors"
import {Color, Light, LightState, RawLight} from "./types"
import {sleep} from "./utils"

class Hue {
    ip: string
    username: string
    api: string

    constructor(ip: string, username: string) {
        this.ip = ip
        this.username = username
        this.api = `http://${ip}/api/${username}`
    }

    readLight = async (id: string): Promise<Light> => {
        const response = await fetch(`${this.api}/lights/${id}`, {
            method: "GET",
        })

        const json = await response.json()
        const light = {id, ...json}

        return light
    }

    readLights = async (): Promise<Light[]> => {
        const response = await fetch(`${this.api}/lights`, {method: "GET"})
        const json: Record<Light["id"], RawLight> = await response.json()

        const lights = Object.entries(json).map(([id, light]) => {
            return {id, ...light}
        })

        return lights
    }

    updateLight = (id: string, state: Partial<LightState>): void => {
        fetch(`${this.api}/lights/${id}/state`, {
            method: "PUT",
            body: JSON.stringify(state),
        })
    }

    turnOnLight = (id: string): void => {
        this.updateLight(id, {on: true})
    }

    turnOnLights = (ids: string[]): void => {
        ids.forEach(id => this.turnOnLight(id))
    }

    turnOnAllLights = async (): Promise<void> => {
        const lights = await this.readLights()

        lights.forEach(light => {
            this.turnOnLight(light.id)
        })
    }

    turnOffLight = (id: string): void => {
        this.updateLight(id, {on: false})
    }

    turnOffLights = (ids: string[]): void => {
        ids.forEach(id => this.turnOffLight(id))
    }

    turnOffAllLights = async (): Promise<void> => {
        const lights = await this.readLights()

        lights.forEach(light => {
            this.turnOffLight(light.id)
        })
    }

    blinkLight = async (
        id: string,
        interval = 500,
        count = 1,
    ): Promise<void> => {
        const light = await this.readLight(id)

        for (let index = 0; index < count; index++) {
            this.updateLight(id, {on: !light.state.on})
            await sleep(interval)

            this.updateLight(id, {on: light.state.on})
            await sleep(interval)
        }
    }

    blinkLights = (
        ids: string[],
        interval = 500,
        count = 1,
    ): Promise<void[]> => {
        const promises = ids.map(id => this.blinkLight(id, interval, count))
        return Promise.all(promises)
    }

    setBrightness = (id: string, brightness: number): void => {
        this.updateLight(id, {bri: brightness})
    }

    setBrightnesses = (ids: string[], brightness: number): void => {
        ids.forEach(id => this.setBrightness(id, brightness))
    }

    setColor = (id: string, color: Color | "random"): string => {
        if (color === "random") {
            const randomColor = this.setRandomColor(id)
            return randomColor
        }

        this.updateLight(id, {
            xy: getColor(color),
            effect: "none",
        })

        return color
    }

    setColors = (ids: string[], color: Color | "random"): string => {
        if (color === "random") {
            const randomColor = this.setRandomColors(ids)
            return randomColor
        }

        ids.forEach(id => this.setColor(id, color))
        return color
    }

    setRandomColor = (id: string): string => {
        const color = getRandomColor()
        this.setColor(id, color)
        return color
    }

    setRandomColors = (ids: string[]): string => {
        const color = getRandomColor()
        this.setColors(ids, color)
        return color
    }

    colorLoopLight = async (id: string, duration?: number): Promise<void> => {
        this.updateLight(id, {
            on: true,
            effect: "colorloop",
        })

        if (duration) {
            await sleep(duration)
            this.updateLight(id, {effect: "none"})
        }
    }

    colorLoopLights = (ids: string[], duration?: number): Promise<void[]> => {
        const promises = ids.map(id => this.colorLoopLight(id, duration))
        return Promise.all(promises)
    }
}

export default Hue
