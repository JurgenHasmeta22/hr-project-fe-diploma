module.exports = {
    roots: ["<rootDir>"],
    testMatch: ["**/__tests__/**/*.test.ts?(x)"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "ts-jest",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
};
