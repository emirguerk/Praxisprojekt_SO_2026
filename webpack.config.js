const fs = require("fs");
const path = require("path");

const entry = {};

fs.readdirSync("./src/addin")
  .filter(file => file.endsWith(".ts"))
  .forEach(file => {
    entry[path.basename(file, ".ts")] =
      "./src/addin/" + file;
  });

module.exports = {
  mode: "development",
  entry,

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
    path: path.resolve(__dirname, "public/dist"
    )
  }
};