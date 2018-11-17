module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "globals": {
    "navigator": false,
    "window": false,
    "document": false,
    "expect": false,
    "it": false,
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
  },
};