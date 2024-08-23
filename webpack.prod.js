const path = require("path");
// const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// const dotenv = require("dotenv");

// Load environment variables from the .env file
// const env = dotenv.config().parsed;
module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client",
    filename: "[name].[contenthash].js", // Better cache management
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new webpack.DefinePlugin({
    //   "process.env.API_PHOTO_KEY": JSON.stringify(env.API_PHOTO_KEY),
    //   "process.env.API_WEATHER_KEY": JSON.stringify(env.API_WEATHER_KEY),
    //   "process.env.API_GEONAMES_KEY": JSON.stringify(env.API_GEONAMES_KEY),
    // }),
  ],
  devServer: {
    port: 3000,
    allowedHosts: "all",
  },
};
