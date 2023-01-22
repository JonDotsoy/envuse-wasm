import { beforeAll, describe, expect, it } from "vitest"
import { demoWorkspace } from "@jondotsoy/demo-workspace"
import { spawnSync } from "child_process"
import * as fs from "fs"

describe("Create Program", () => {
    const workspace = demoWorkspace({ workspaceName: "sample1" })
    beforeAll(async () => {
        const fileDone = new URL(".done", workspace.cwd);

        if (!fs.existsSync(fileDone)) {
            const cwd = new URL("../", import.meta.url);
            const out = spawnSync("npm", ["pack"], { cwd });
            const packageLocation = new URL(out.stdout.toString().trim(), cwd);
            workspace.file("package.json", "{}");
            spawnSync("npm", ["add", packageLocation.pathname], { cwd: workspace.cwd });
            fs.writeFileSync(fileDone, "")
        }
    }, 20_000)

    it("should", async () => {
        const { location: envuseFile } = workspace.file(
            '.envuse',
            `
                A=""
                B:Boolean="true"
                C:Number=12
                D:BIZ=""
            `,
        );

        const { loadEnvuse } = await import("./__demos__/envuse-wasm.test/sample1/node_modules/@envuse/wasm/lib/envuse.mjs");
        const envuse: import("../types").Envuse = loadEnvuse();

        const program = envuse.create_program(
            fs.readFileSync(envuseFile, "utf-8"),
            "./__demos__/envuse-wasm.test/sample1/node_modules/@envuse/wasm/lib/envuse.mjs",
        );

        const values = envuse.parser_values(program, {}, ["BIZ"]);

        expect(values).toMatchInlineSnapshot(`
          Map {
            "A" => {
              "String": "",
            },
            "B" => {
              "Boolean": true,
            },
            "C" => {
              "Number": 12,
            },
            "D" => {
              "Custom": [
                "biz",
                "",
              ],
            },
          }
        `);
    })
})