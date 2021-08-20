const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  rules: [
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: ["babel-loader", "eslint-loader"],
    },
  ],
};
