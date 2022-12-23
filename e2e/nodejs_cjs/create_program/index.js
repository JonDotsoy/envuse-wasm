const { loadEnvuse } = require("@envuse/wasm")


const { create_program } = loadEnvuse()

const foo_program = create_program("FOO")

console.log("###=>", JSON.stringify({ foo_program_type: typeof foo_program }))

