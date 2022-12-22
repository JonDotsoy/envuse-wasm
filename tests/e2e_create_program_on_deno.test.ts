import { spawn } from "child_process"
import { resolve } from "path"
import chalk from "chalk"
import { createInterface } from "readline"
import { describe, expect, it } from "vitest"

const appDirectory = resolve(`${__dirname}/../e2e/create_program_on_deno`)
let color_selected = 0
const colors: (keyof typeof chalk)[] = [
    "red",
    "blue",
]


const run = async (cmd: string, ...args: string[]): Promise<{ vars: Record<string, any>, exitCode: number | null, stdout: Uint8Array, stderr: Uint8Array }> => {
    const inlineCmd = `${cmd} ${args.join(" ")}`;
    const cmdStrMaxLen = 15
    const cmdStr = inlineCmd.length > cmdStrMaxLen ? `${inlineCmd.substring(0, cmdStrMaxLen - 3)}...` : inlineCmd
    const ps = spawn(cmd, args, { cwd: appDirectory })
    let vars: Record<string, any> = {}
    const stdout: number[] = []
    const stderr: number[] = []

    ps.stdout.on("data", data => stdout.push(...data))
    ps.stderr.on("data", data => stderr.push(...data))

    const stdoutReadLines = createInterface({ input: ps.stdout })
    const stderrReadLines = createInterface({ input: ps.stderr })

    const detectVar = (line: string) => {
        if (line.startsWith(`###=>`)) {
            try {
                vars = {
                    ...vars,
                    ...JSON.parse(line.substring(5))
                };
            } catch { }
        }
    }

    stdoutReadLines.on("line", line => { detectVar(line); console.log(chalk.grey(`${cmdStr} > ${line}`)); });
    stderrReadLines.on("line", line => { detectVar(line); console.error(chalk.red(`${cmdStr} > ${line}`)); });

    await new Promise<number | undefined>((resolve) => ps.once("exit", resolve))

    return {
        vars,
        exitCode: ps.exitCode,
        stdout: new Uint8Array(stdout),
        stderr: new Uint8Array(stderr),
    }
}

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
