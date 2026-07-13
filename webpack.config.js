const fs = require("fs");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",

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

  plugins: [
    new Dotenv({
      path: process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development"
    })
  ],

  output: {
    filename: "[name].js",
    path: isProduction
      ? path.resolve(__dirname, "production/dist")
      : path.resolve(__dirname, "public/dist")
  }
};