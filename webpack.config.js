const fs = require("fs");
const path = require("path");


module.exports = {
  mode: "development",
  entry: {
    taskPane: "./src/addin/taskPane.ts",
    dialog: "./src/addin/dialog.ts",
    help: "./src/addin/help.ts"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
            loader: "ts-loader",
            options: {
                    configFile: path.resolve(__dirname, "./tsconfig.json")
            }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist")
  }
};