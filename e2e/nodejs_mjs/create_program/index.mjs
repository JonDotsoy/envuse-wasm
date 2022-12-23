import { envuse } from "@envuse/wasm"

const bootstrap = async () => {
    const { create_program } = await envuse()

    const foo_program = create_program("FOO")

    console.log("###=>", JSON.stringify({ foo_program_type: typeof foo_program }))
}

bootstrap()
