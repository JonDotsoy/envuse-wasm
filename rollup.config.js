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
        { file: "lib/envuse.js",format: 'cjs', sourcemap:true },
        { file: "lib/envuse.cjs",format: 'cjs', sourcemap:true },
        { file: "lib/envuse.mjs",format: 'esm', sourcemap:true },
    ]
}
