const fetch = require("node-fetch")
const {getColor, getRandomColor} = require("./colors")
const {sleep} = require("./utils")

class Hue {
    constructor(ip, username) {
        this.api = `http://${ip}/api/${username}`
    }

    readLight = async id => {
        const response = await fetch(`${this.api}/lights/${id}`, {
            method: "GET",
        })

        const json = await response.json()
        const light = {id, ...json}

        return light
    }

    readLights = async () => {
        const response = await fetch(`${this.api}/lights`, {method: "GET"})
        const json = await response.json()

        const lights = Object.entries(json).map(([id, light]) => {
            return {id, ...light}
        })

        return lights
    }

    updateLight = async (id, state) => {
        fetch(`${this.api}/lights/${id}/state`, {
            method: "PUT",
            body: JSON.stringify(state),
        })
    }

    turnOnLight = id => {
        this.updateLight(id, {on: true})
    }

    turnOnLights = ids => {
        ids.forEach(id => this.turnOnLight(id))
    }

    turnOnAllLights = async () => {
        const lights = await this.readLights()

        lights.forEach(light => {
            this.turnOnLight(light.id)
        })
    }

    turnOffLight = id => {
        this.updateLight(id, {on: false})
    }

    turnOffLights = ids => {
        ids.forEach(id => this.turnOffLight(id))
    }

    turnOffAllLights = async () => {
        const lights = await this.readLights()

        lights.forEach(light => {
            this.turnOffLight(light.id)
        })
    }

    blinkLight = async (id, interval = 500, count = 1) => {
        const {state} = await this.readLight(id)

        while (count > 0) {
            await this.updateLight(id, {on: !state.on})
            await sleep(interval)

            await this.updateLight(id, {on: state.on})
            await sleep(interval)

            count--
        }

        return Promise.resolve()
    }

    blinkLights = async (ids, interval = 500, count = 1) => {
        ids.forEach(id => this.blinkLights(id, interval, count))
    }

    setBrightness = (id, brightness) => {
        this.updateLight(id, {bri: brightness})
    }

    setBrightnesses = (ids, brightness) => {
        ids.forEach(id => this.setBrightness(id, brightness))
    }

    setColor = (id, color) => {
        if (color === "random") {
            const randomColor = this.setRandomColor(id)
            return randomColor
        }

        this.updateLight(id, {xy: getColor(color)})
        return color
    }

    setColors = (ids, color) => {
        if (color === "random") {
            const randomColor = this.setRandomColors(ids)
            return randomColor
        }

        ids.forEach(id => this.setColor(id, color))
        return color
    }

    setRandomColor = id => {
        const color = getRandomColor()
        this.setColor(id, color)
        return color
    }

    setRandomColors = ids => {
        const color = getRandomColor()
        this.setColors(ids, color)
        return color
    }
}

module.exports = Hue
