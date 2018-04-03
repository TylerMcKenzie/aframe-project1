const webpack = require("webpack");
const path = require("path");
const { resolve } = path;
const src = resolve(__dirname, 'src');
const build = resolve(__dirname, 'build');

module.exports = {
  mode: "development",
  entry: {
    app: './index.js'
  },
  output: {
    path: build,
    filename: '[name].bundle.js'
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          minSize: 1
        }
      }
    }
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [src],
            exclude: /node_modules/
        },
        {
            test: /.html$/,
            loader: 'raw-loader'
        }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  }
}
