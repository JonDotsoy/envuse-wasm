import { loadEnvuse as loadEnvuseEsm } from "./lib/envuse.async.mjs"
import { Envuse } from "./types.ts";

export const loadEnvuse = (): Promise<Envuse> => loadEnvuseEsm()
