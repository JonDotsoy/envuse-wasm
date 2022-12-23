import { loadEnvuse } from "@envuse/wasm"


const { create_program } = loadEnvuse()

const foo_program = create_program("foo")

console.log("###=>", JSON.stringify({ foo_program_type: typeof foo_program }))

