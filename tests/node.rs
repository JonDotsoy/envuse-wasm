#![cfg(target_arch = "wasm32")]

use envuse_wasm::{create_program, parser_values};
use std::{collections::BTreeMap, option::Option};
use wasm_bindgen::JsValue;
use wasm_bindgen_test::wasm_bindgen_test;
use web_sys::console;

#[wasm_bindgen_test]
fn sample_build() {
    let source = r#"
        FOO: String?
        BIZ: Number = 3000
        FOD: String
        VAR
    "#;

    let location: Option<String> = None;

    let ref program = create_program(source.to_string(), location).unwrap();

    console::log_1(&program);

    let values = serde_wasm_bindgen::to_value(&BTreeMap::from([
        ("FOD".to_string(), Some("b".to_string())),
        ("VAR".to_string(), Some("b".to_string())),
        ("d".to_string(), Some("b".to_string())),
        ("e".to_string(), None),
    ]))
    .unwrap();

    let res = parser_values(program.to_owned(), values, JsValue::undefined()).unwrap();

    console::log_1(&res);
}
