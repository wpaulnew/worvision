const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {

  entry: "./app/index.js",

  watch: true,

  output: {
    path: path.join(__dirname, './api/build'),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./api/build/index.html",
    //   filename: "./index.html"
    // })
  ],

  resolve: {
    alias: {
      'react-virtualized/List': 'react-virtualized/dist/es/List',
    }
  }

};