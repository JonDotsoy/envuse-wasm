const rust = require("@wasm-tool/rollup-plugin-rust")

/** @type {import("rollup").RollupOptions} */
module.exports = [
    {
        input: "./lib/envuse.cargo.js",
        plugins: [
            rust({
                inlineWasm: true,
                experimental: {
                    synchronous: true,
                },
            })
        ],
        output: [
            { file: "./lib/envuse.js", format: 'cjs', sourcemap: true },
            { file: "./lib/envuse.cjs", format: 'cjs', sourcemap: true },
            { file: "./lib/envuse.mjs", format: 'esm', sourcemap: true },
        ]
    },
    {
        input: "./lib/envuse.async.cargo.js",
        plugins: [
            rust({
                inlineWasm: true,
            })
        ],
        output: [
            { file: "./lib/envuse.async.js", format: 'cjs', sourcemap: true },
            { file: "./lib/envuse.async.cjs", format: 'cjs', sourcemap: true },
            { file: "./lib/envuse.async.mjs", format: 'esm', sourcemap: true },
        ]
    }
]
