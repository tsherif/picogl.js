const webpack = require("webpack");
const path = require('path');
const fs = require('fs');

const license = fs.readFileSync('LICENSE', { encoding: "utf8" });

module.exports = {
    mode: "production",
    entry: "./build/module/picogl.js",
    plugins: [
        new webpack.BannerPlugin({
          banner: license
        })
    ],
    devtool: "source-map",
    output: {
        library: "PicoGL",
        path: path.resolve(__dirname, "build"),
        filename: "picogl.min.js",
        libraryTarget: "umd",
        libraryExport: "PicoGL"
    }
};
