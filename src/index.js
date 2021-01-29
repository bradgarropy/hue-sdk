const fetch = require("node-fetch")
const {getColor, getRandomColor} = require("./colors")
const {sleep} = require("./utils")
class Hue {
    constructor(ip, username) {
        this.api = `http://${ip}/api/${username}`
    }

    turnOnLight = id => {
        this.updateLight(id, {on: true})
    }

    turnOffLight = id => {
        this.updateLight(id, {on: false})
    }
    
    blinkLight = async (id, interval = 750, count = 1) => {
        while(count > 0){
            this.turnOnLight(id)
            await sleep(interval)
            this.turnOffLight(id)
            await sleep(interval)
            this.turnOnLight(id)
            count--
        }
    }

    turnOffAllLights = async () => {
        const lights = await this.readLights()
        lights.forEach((light) => {
            this.turnOffLight(light.id) 
        })
    }

    turnOnAllLights = async () => {
        const lights = await this.readLights()
        lights.forEach((light) => {
            this.turnOnLight(light.id)
        })
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

    async updateLight(id, state) {
        fetch(`${this.api}/lights/${id}/state`, {
            method: "PUT",
            body: JSON.stringify(state),
        })
    }
    
    async readLight(id) {
        const response = await fetch(`${this.api}/lights/${id}`, {
            method: "GET",
        })
    
        const json = await response.json()
        const light = {id, ...json}
    
        return light
    }
    
    async readLights() {
        const response = await fetch(`${this.api}/lights`, {method: "GET"})
        const json = await response.json()
    
        const lights = Object.entries(json).map(([id, light]) => {
            return {id, ...light}
        })
    
        return lights
    }
}

module.exports = Hue
