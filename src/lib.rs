use std::collections::BTreeMap;

use envuse_parser::envuse::{self, Program};
use serde_wasm_bindgen;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

#[wasm_bindgen]
pub fn create_program(source: String, location: Option<String>) -> Result<JsValue, JsValue> {
    Ok(serde_wasm_bindgen::to_value(&envuse::create_program(
        source, location,
    )?)?)
}

#[wasm_bindgen]
pub fn parser_values(program_source: JsValue, values: JsValue) -> Result<JsValue, JsValue> {
    let program: Program = serde_wasm_bindgen::from_value(program_source)?;
    let v: BTreeMap<String, Option<String>> = serde_wasm_bindgen::from_value(values)?;

    Ok(serde_wasm_bindgen::to_value(&program.parse(v))?)
}
