import { envuse as envuseEsm } from "./lib/envuse.mjs"
import { Envuse } from "./types.ts";

export const envuse = (): Promise<Envuse> => envuseEsm()
