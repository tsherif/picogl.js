module.exports = {
    // JSDoc config
    source: {
        include: [ "./src/" ]
    },
    opts: {
        template: "./node_modules/tsd-jsdoc/dist",
        destination: "./build/",
        recurse: true,
        access: "private",
        private: true
    },

    // replace-in-file config
    files: "build/types.d.ts",
    from: [ "declare var exportDefaultPicoGL: PicoGL", /^\s*declare /gm ],
    to: [ "export default PicoGL", "export " ]
};
