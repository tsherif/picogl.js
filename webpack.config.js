module.exports = {
    entry: "./src/picogl.js",
    output: {
        library: "PicoGL",
        filename: "build/temp.js",
        libraryTarget: "umd",
        libraryExport: "PicoGL"
    }
};
