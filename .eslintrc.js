module.exports = {
  env: {
  	browser: true,
    node: true,
  	es6: true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "babel-eslint",
  rules: {
  	"no-console": ["off"]
  }
};