// need ts-node for run this file

import * as path from "path";
import * as htmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
const environment = !process.env.NODE_ENV ? "development" : "production";

const config: webpack.Configuration = {
  entry: "./index.ts",
  devtool: "inline-source-map",
  mode: environment,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "less-loader", // compiles Less to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 1111,
  },
};

export default config;
