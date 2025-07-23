export default{
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleFileExtensions: ["js", "jsx"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  };
  