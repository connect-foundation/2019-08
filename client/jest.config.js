module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/tsconfig.json"
        }
    },
    roots: ["<rootDir>/test"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "/**/*.(test|spec).(ts|js)"
    ],
    testEnvironment: "node",
    moduleDirectories: [
        "node_modules",
        "src"
    ]
};