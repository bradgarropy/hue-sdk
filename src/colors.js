const {randomInteger} = require("./utils")

const colors = {
    white: [0.3111, 0.3278],
    red: [0.6059, 0.3088],
    orange: [0.5957, 0.3488],
    yellow: [0.4676, 0.4333],
    green: [0.2144, 0.6124],
    blue: [0.1579, 0.1383],
    purple: [0.2359, 0.1227],
    lime: [0.3068, 0.5235],
    teal: [0.1867, 0.3497],
    pink: [0.3806, 0.2026],
}

const getColor = color => colors[color]

const getRandomColor = () => {
    const index = randomInteger(0, Object.entries(colors).length - 1)
    const color = Object.keys(colors)[index]
    return color
}

module.exports = {getColor, getRandomColor}
