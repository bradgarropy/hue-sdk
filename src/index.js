const {getColor, getRandomColor} = require("./colors")
class Hue {
    constructor(hueClient) {
        this.client = hueClient
    }

    getLightInfo = async id => {
        return this.client.readLight(id)
    }

    getLightsInfo = async () => {
        return this.client.readLights(this.client)
    }

    turnOnLight = id => {
        this.client.updateLight(id, {on: true}, )
    }

    turnOffLight = id => {
        this.client.updateLight(id, {on: false}, )
    }
    
    blinkLight = async id => {
        this.turnOnLight(id)
        await new Promise(resolve => setTimeout(resolve, 750))
        this.turnOffLight(id)
        await new Promise(resolve => setTimeout(resolve, 750))
        this.turnOnLight(id)
    }

    turnOffAllLights = async () => {
        const lights = await this.getLightsInfo()
        lights.forEach(async (light) => {
            await this.client.updateLight(light.id, {on: false})
        })
    }

    turnOnAllLights = async () => {
        const lights = await this.getLightsInfo()
        lights.forEach(async (light) => {
            await this.client.updateLight(light.id, {on: true})
        })
    }

    setBrightness = (id, brightness) => {
        this.client.updateLight(id, {bri: brightness})
    }

    setColor = (id, color) => {
        if (color === "random") {
            this.setRandomColor(id)
        } else {
            this.client.updateLight(id, {xy: getColor(color)})
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
