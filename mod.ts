import { envuse as envuseMjs } from "./dist/envuse.mjs"
import { Envuse } from "./types.ts";

export const envuse = (): Promise<Envuse> => envuseMjs()
