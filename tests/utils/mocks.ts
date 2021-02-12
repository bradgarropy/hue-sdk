import {Light, RawLight} from "../../src/types"

const rawLight: RawLight = {
    state: {
        on: true,
        bri: 200,
        hue: 32000,
        sat: 128,
        xy: [0.2, 0.4],
        ct: 250,
        alert: "select",
        effect: "none",
    },
    type: "Extended color light",
    name: "Test light",
    modelid: "LCT010",
    swversion: "1.5",
}

const light: Light = {
    id: "1",
    state: {
        on: true,
        bri: 200,
        hue: 32000,
        sat: 128,
        xy: [0.2, 0.4],
        ct: 250,
        alert: "select",
        effect: "none",
    },
    type: "Extended color light",
    name: "Test light",
    modelid: "LCT010",
    swversion: "1.5",
}

const updateResponse = [{success: {"/lights/1/state/on": true}}]

export {light, rawLight, updateResponse}
