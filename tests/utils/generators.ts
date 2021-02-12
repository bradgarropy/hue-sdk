import {Light, RawLight} from "../../src/types"
import {light, rawLight} from "./mocks"

type GenerateRawLightParams = {
    overrides?: Partial<RawLight>
}

const generateRawLight = ({
    overrides,
}: GenerateRawLightParams = {}): RawLight => {
    return {
        ...rawLight,
        ...overrides,
    }
}

type GenerateRawLightsParams = {
    count?: number
}

const generateRawLights = ({
    count = 3,
}: GenerateRawLightsParams = {}): RawLight[] => {
    const rawLights = []

    for (let index = 0; index < count; index++) {
        const overrides = {
            name: `Test light ${index}`,
        }

        const rawLight = generateRawLight({overrides})
        rawLights.push(rawLight)
    }

    return rawLights
}

type GenerateLightParams = {
    overrides?: Partial<Light>
}

const generateLight = ({overrides}: GenerateLightParams = {}): Light => {
    return {
        ...light,
        ...overrides,
    }
}

type GenerateLightsParams = {
    count?: number
}

const generateLights = ({count = 3}: GenerateLightsParams = {}): Light[] => {
    const lights = []

    for (let index = 0; index < count; index++) {
        const overrides = {
            id: index.toString(),
            name: `Test light ${index}`,
        }

        const light = generateLight({overrides})
        lights.push(light)
    }

    return lights
}

export {generateLight, generateLights, generateRawLight, generateRawLights}
