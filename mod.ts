import { loadEnvuse as loadEnvuseEsm } from "./lib/envuse.mjs"
import { Envuse } from "./types.ts";

export const loadEnvuse = (): Envuse => loadEnvuseEsm()
