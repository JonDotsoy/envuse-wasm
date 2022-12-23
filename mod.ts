import { envuse as envuseEsm } from "./dist/envuse.esm.js"
import { Envuse } from "./types.ts";

export const envuse = (): Promise<Envuse> => envuseEsm()
