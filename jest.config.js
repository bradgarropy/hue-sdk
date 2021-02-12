const config = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/src/**"],
    preset: "ts-jest",
    setupFiles: ["<rootDir>/tests/utils/setup.ts"],
    testEnvironment: "node",
    verbose: true,
}

module.exports = config
