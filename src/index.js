const fetch = require("node-fetch")
const {getColor, getRandomColor} = require("./colors")

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
            this.updateLight(id, {xy: getColor(color)})
        }
    }

    setColors = (ids, color) => {
        if (color === "random") {
            this.setRandomColors(ids)
        } else {
            ids.forEach(id => this.setColor(id, color))
        }
    }

    setRandomColor = id => {
        const color = getRandomColor()
        this.setColor(id, color)
    }

    setRandomColors = ids => {
        const color = getRandomColor()
        this.setColors(ids, color)
    }
}

module.exports = Hue
