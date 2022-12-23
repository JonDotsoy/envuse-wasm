import { loadEnvuse } from "../../../mod.ts";

const program_1 = loadEnvuse().create_program("A")
const program_2 = loadEnvuse().create_program("A: Number")
const program_3 = loadEnvuse().create_program("A: Number = 3_000")

console.log(`###=>`, JSON.stringify({
    program_1_type: typeof program_1,
    program_2_type: typeof program_2,
    program_3_type: typeof program_3,
}))
