import { resolve } from "path"
import chalk from "chalk"
import { describe, expect, it } from "vitest"
import { createRun } from "./utils/child_process/run"

const appDirectory = resolve(`${__dirname}/../e2e/deno/create_program`)

const run = createRun(appDirectory)

describe("Deno setup", () => {
    it("create program", async () => {
        const res = await run("deno", "run", "index.ts")

        expect(res.exitCode).toEqual(0)
        expect(res.vars).containSubset({
            program_1_type: "object",
            program_2_type: "object",
            program_3_type: "object",
        })
    })
})
