const rust = require("@wasm-tool/rollup-plugin-rust")

/** @type {import("rollup").RollupOptions} */
module.exports = {
    input: "./envuse.js",
    plugins: [
        rust({
            inlineWasm: true,
        })
    ],
    output: [
        { file: "dist/envuse.cjs.js",format: 'cjs', sourcemap:true },
        { file: "dist/envuse.cjs",format: 'cjs', sourcemap:true },
        { file: "dist/envuse.esm.js",format: 'esm', sourcemap:true },
        { file: "dist/envuse.mjs",format: 'esm', sourcemap:true },
    ]
}
