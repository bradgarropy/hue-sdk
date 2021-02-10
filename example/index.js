require("dotenv").config()
const Hue = require("../.")

const run = async () => {
    const hue = new Hue(process.env.HUE_BRIDGE_IP, process.env.HUE_USERNAME)
    const lights = await hue.readLights()

    console.log(lights)
}

run()
