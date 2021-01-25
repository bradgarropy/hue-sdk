const fetch = require("node-fetch")
const {getColor, getRandomColor} = require("./colors")

class Hue {
    constructor(ip, username) {
        this.api = `http://${ip}/api/${username}`
    }

    getLightInfo = async id => {
        return readLight(id)
    }

    getLightsInfo = async () => {
        return readLights()
    }

    turnOnLight = id => {
        updateLight(id, {on: true})
    }

    turnOffLight = id => {
        updateLight(id, {on: false})
    }

    turnOffAllLights = () => {
        const lights = this.getLightsInfo()
        lights.forEach((light) => {
            updateLight(light.id, {on: false})
        })
    }

    turnOnAllLights = () => {
        const lights = this.getLightsInfo()
        lights.forEach((light) => {
            updateLight(light.id, {on: true})
        })
    }

    setBrightness = (id, brightness) => {
        updateLight(id, {bri: brightness})
    }

    setColor = (id, color) => {
        if (color === "random") {
            this.setRandomColor(id)
        } else {
            updateLight(id, {xy: getColor(color)})
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

async function updateLight(id, state) {
    fetch(`${this.api}/lights/${id}/state`, {
        method: "PUT",
        body: JSON.stringify(state),
    })
}

async function readLight(id) {
    const response = await fetch(`${this.api}/lights/${id}`, {
        method: "GET",
    })

    const json = await response.json()
    const light = {id, ...json}

    return light
}

async function readLights() {
    const response = await fetch(`${this.api}/lights`, {method: "GET"})
    const json = await response.json()

    const lights = Object.entries(json).map(([id, light]) => {
        return {id, ...light}
    })

    return lights
}

module.exports = Hue
