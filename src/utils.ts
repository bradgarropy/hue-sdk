const randomDecimal = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export {randomDecimal, randomInteger, sleep}
