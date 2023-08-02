/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  useESM: true
  // transform:
  // {
  //   "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
  //   "^.+\\.tsx?$": "ts-jest"
  // }
};