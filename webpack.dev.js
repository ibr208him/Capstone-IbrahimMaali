// const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const dotenv = require("dotenv");

// Load environment variables from the .env file
// const env = dotenv.config().parsed;
// console.log("Environment Variables:", env);
module.exports = {
  entry: "./src/client/index.js",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
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
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
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
