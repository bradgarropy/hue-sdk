const config = {
    clearMocks: true,
    collectCoverage: true,
    preset: "ts-jest",
    setupFiles: ["./tests/setup.ts"],
    testEnvironment: "node",
    verbose: true,
}

module.exports = config
