import { resolve } from "path"
import chalk from "chalk"
import { beforeAll, describe, expect, it } from "vitest"
import { createRun } from "./utils/child_process/run"

describe("E2E", () => {

    describe("Deno", () => {
        const appDirectory = resolve(`${__dirname}/../e2e/deno/create_program`)
        const run = createRun(appDirectory)

        it("create program", async () => {
            const res = await run("deno", "run", "index.ts")

            expect(res.exitCode).toEqual(0)
            expect(res.vars).containSubset({
                program_1_type: "object",
                program_2_type: "object",
                program_3_type: "object",
            })
        })

        it("create program async", async () => {
            const res = await run("deno", "run", "index.async.ts")

            expect(res.exitCode).toEqual(0)
            expect(res.vars).containSubset({
                program_1_type: "object",
                program_2_type: "object",
                program_3_type: "object",
            })
        })
    })


    describe("NodeJS with typescript", () => {
        const appDirectory = resolve(`${__dirname}/../e2e/nodejs_cjs/create_program/`)
        const run = createRun(appDirectory)

        beforeAll(async () => {
            await run(0, "npm", "install");
        })

        it("should run app index.ts", async () => {
            const { exitCode, vars } = await run("node", "index.js")

            expect(exitCode).toEqual(0)
            expect(vars.foo_program_type).toEqual("object")
        })
    })


    describe("NodeJS (mjs)", () => {
        const appDirectory = resolve(`${__dirname}/../e2e/nodejs_mjs/create_program/`)
        const run = createRun(appDirectory)

        beforeAll(async () => {
            await run(0, "npm", "install");
        })

        it("should run app index.ts", async () => {
            const { exitCode, vars } = await run("node", "index.mjs")

            expect(exitCode).toEqual(0)
            expect(vars.foo_program_type).toEqual("object")
        })
    })


    describe("NodeJS (cjs)", () => {
        const appDirectory = resolve(`${__dirname}/../e2e/nodejs_ts/create_program/`)
        const run = createRun(appDirectory)

        beforeAll(async () => {
            await run(0, "npm", "install");
        })

        it("should run app index.ts", async () => {
            const { exitCode, vars } = await run("npx", "ts-node", "index.ts")

            expect(exitCode).toEqual(0)
            expect(vars.foo_program_type).toEqual("object")
        })
    })

})