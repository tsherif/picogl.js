const fs = require('fs');
const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const license = fs.readFileSync('LICENSE', { encoding: "utf8" });

module.exports = {
    entry: "./build/module/picogl.js",
    mode: "production",
    output: {
        library: "PicoGL",
        path: path.resolve(__dirname, "build"),
        filename: "picogl.min.js",
        libraryTarget: "umd",
        libraryExport: "PicoGL"
    },
    plugins: [
        new webpack.BannerPlugin({
          banner: license
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: true,
            extractComments: false,
            terserOptions: {
              output: {
                comments: /^\**!/,
              },
            }
        })]
    },
    devtool: "source-map"
};
