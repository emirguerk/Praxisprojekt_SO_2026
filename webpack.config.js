const fs = require("fs");
const path = require("path");


module.exports = {
  mode: "development",
  entry: "./src/addin/index.ts",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
            loader: "ts-loader",
            options: {
                    configFile: path.resolve(__dirname, "./tsconfigs/tsconfig.addin.json")
            }
        },
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/dist")
  }
};