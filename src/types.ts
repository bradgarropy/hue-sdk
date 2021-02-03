type Color =
    | "white"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "lime"
    | "teal"
    | "pink"

type XYColor = [number, number]

type LightState = {
    on: boolean
    bri: number
    hue: number
    sat: number
    xy: [number, number]
    ct: number
    alert: string
    effect: string
}

type RawLight = {
    state: {
        on: boolean
        bri: number
        hue: number
        sat: number
        xy: [number, number]
        ct: number
        alert: string
        effect: string
    }
    type: string
    name: string
    modelid: string
    swversion: string
}

type Light = {
    id: string
    state: {
        on: boolean
        bri: number
        hue: number
        sat: number
        xy: [number, number]
        ct: number
        alert: string
        effect: string
    }
    type: string
    name: string
    modelid: string
    swversion: string
}

export {Color, Light, LightState, RawLight, XYColor}
