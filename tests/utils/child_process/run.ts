import { spawn } from "child_process";
import chalk from "chalk";
import { createInterface } from "readline";



type NewType_2 = [string, ...string[]];

type NewType = NewType_2 | [number, string, ...string[]];


type NewType_1 = {
    vars: Record<string, any>;
    exitCode: number | null;
    stdout: Uint8Array;
    stderr: Uint8Array;
};

const d = ([expectExitCode, ...args]: NewType): [number | null, ...string[]] =>
    typeof expectExitCode === 'string'
        ? [null, expectExitCode, ...args]
        : [expectExitCode, ...args]

export const createRun = (dirname: string) => async (...cmdArgs: NewType): Promise<NewType_1> => {
    const [expectExitCode, cmd, ...args] = d(cmdArgs);

    const inlineCmd = `${cmd} ${args.join(" ")}`;

    console.log(chalk.green(`run > ${inlineCmd}`))

    const cmdStrMaxLen = 15;
    const cmdStr = inlineCmd.length > cmdStrMaxLen ? `${inlineCmd.substring(0, cmdStrMaxLen - 3)}...` : inlineCmd;
    const ps = spawn(cmd, args, {
        cwd: dirname,
    });
    let vars: Record<string, any> = {};
    const stdout: number[] = [];
    const stderr: number[] = [];

    ps.stdout.on("data", data => stdout.push(...data));
    ps.stderr.on("data", data => stderr.push(...data));

    const stdoutReadLines = createInterface({ input: ps.stdout });
    const stderrReadLines = createInterface({ input: ps.stderr });

    const detectVar = (line: string) => {
        if (line.startsWith(`###=>`)) {
            try {
                vars = {
                    ...vars,
                    ...JSON.parse(line.substring(5))
                };
            } catch { }
        }
    };

    stdoutReadLines.on("line", line => { detectVar(line); console.log(chalk.grey(`${cmdStr} > ${line}`)); });
    stderrReadLines.on("line", line => { detectVar(line); console.error(chalk.red(`${cmdStr} > ${line}`)); });

    await new Promise<number | undefined>((resolve) => ps.once("exit", resolve));

    if (expectExitCode !== null && ps.exitCode !== expectExitCode) {
        throw new Error(`Exit process exit expected ${expectExitCode} but recibe ${ps.exitCode}`)
    }

    return {
        vars,
        exitCode: ps.exitCode,
        stdout: new Uint8Array(stdout),
        stderr: new Uint8Array(stderr),
    };
};


