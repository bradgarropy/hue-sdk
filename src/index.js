const fetch = require("node-fetch")
const colors = require("./colors")
const {randomInteger} = require("./utils")

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

    updateLight = (id, state) => {
        fetch(`${this.api}/lights/${id}/state`, {
            method: "PUT",
            body: JSON.stringify(state),
        })
    }

    turnOnLight = id => {
        this.updateLight(id, {on: true})
    }

    turnOffLight = id => {
        this.updateLight(id, {on: false})
    }

    setBrightness = (id, brightness) => {
        this.updateLight(id, {bri: brightness})
    }

    setColor = (id, color) => {
        if (color === "random") {
            this.setRandomColor(id)
        } else {
            this.updateLight(id, {xy: colors[color]})
        }
    }

    setRandomColor = id => {
        const index = randomInteger(0, Object.entries(colors).length - 1)
        const color = Object.keys(colors)[index]
        this.setColor(id, color)
    }
}

module.exports = Hue
