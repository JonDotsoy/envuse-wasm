import { resolve } from "node:path"
import { beforeAll, describe, expect, it } from "vitest"
import { createRun } from "./utils/child_process/run"

const appDirectory = resolve(`${__dirname}/../e2e/nodejs&ts/create_program/`)

const run = createRun(appDirectory)

describe("NodeJS Setup with typescript", () => {
    beforeAll(async () => {
        await run(0, "npm", "install");
    })

    it("should run app index.ts", async () => {
        const { exitCode, vars } = await run("npx", "ts-node", "index.ts")

        expect(exitCode).toEqual(0)
        expect(vars.foo_program_type).toEqual("object")
    })
})