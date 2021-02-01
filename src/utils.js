const randomDecimal = (min, max) => {
    return Math.random() * (max - min) + min
}

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {randomDecimal, randomInteger, sleep}
