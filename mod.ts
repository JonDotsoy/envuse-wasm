import { wasm } from "./dist/envuse.mjs"
import { Envuse } from "./types.ts";

export const envuse = (): Promise<Envuse> => wasm()

