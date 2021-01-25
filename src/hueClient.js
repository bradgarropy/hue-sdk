const fetch = require("node-fetch")
class HueClient {
    constructor(ip, username) {
        this.ip = ip
        this.username = username
        this.api = `http://${ip}/api/${username}`
    }

    getUserName(){
        return this.username
    }

    getIpAddress(){
        return this.ip
    }

    getApi(){
        return this.api
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

module.exports = HueClient
