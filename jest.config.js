export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^[^.]+.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  }
}