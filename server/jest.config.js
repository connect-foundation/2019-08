module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.json"
        }
    },
    roots: ["<rootDir>/test"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.(test|spec).(ts|js)"
    ],
    testEnvironment: "node"
};