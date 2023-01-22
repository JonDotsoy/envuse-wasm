#![feature(try_blocks)]
#![feature(yeet_expr)]

use envuse_parser::{
    envuse::{self, program::Program},
    errors::program_error::ProgramError,
};
use js_sys;
use serde_wasm_bindgen;
use std::collections::BTreeMap;
use wasm_bindgen::prelude::{wasm_bindgen, JsValue};

fn program_error_to_js_value(
    err: Box<dyn std::error::Error>,
    location: Option<String>,
) -> Result<JsValue, JsValue> {
    match err {
        _ if err.is::<ProgramError>() => {
            let program_error = err.downcast_ref::<ProgramError>().unwrap();
            let err_obj = js_sys::Error::new(&program_error.to_string());
            js_sys::Reflect::set(&err_obj, &"name".into(), &"ProgramError".into())?;
            js_sys::Reflect::set(
                &err_obj,
                &"span".into(),
                &serde_wasm_bindgen::to_value(&program_error.span.clone())?,
            )?;
            js_sys::Reflect::set(
                &err_obj,
                &"location".into(),
                &serde_wasm_bindgen::to_value(&program_error.location)?.into(),
            )?;
            Ok(JsValue::from(err_obj))
        }
        _ => {
            let err_obj = js_sys::Error::new(&err.to_string().as_str());

            js_sys::Reflect::set(
                &err_obj,
                &"location".into(),
                &serde_wasm_bindgen::to_value(&location)?.into(),
            )?;

            Ok(JsValue::from(err_obj))
        }
    }
}

#[wasm_bindgen]
pub fn create_program(source: String, location: Option<String>) -> Result<JsValue, JsValue> {
    let program: Result<JsValue, Box<dyn std::error::Error>> = try {
        serde_wasm_bindgen::to_value(&envuse::create_program::create_program(
            source,
            location.clone(),
        )?)?
    };

    match program {
        Ok(program) => Ok(program),
        Err(err) => Err(program_error_to_js_value(err, location)?),
    }
}

#[wasm_bindgen]
pub fn parser_values(
    program_source: JsValue,
    values: JsValue,
    custom_transformers_source: JsValue,
) -> Result<JsValue, JsValue> {
    let parsed: Result<JsValue, Box<dyn std::error::Error>> = try {
        let program: Program = serde_wasm_bindgen::from_value(program_source)?;
        let custom_transformers: Option<Vec<String>> =
            serde_wasm_bindgen::from_value(custom_transformers_source)?;
        let v: BTreeMap<String, Option<String>> = serde_wasm_bindgen::from_value(values)?;
        serde_wasm_bindgen::to_value(&program.parse(v, custom_transformers)?)?
    };

    match parsed {
        Ok(program) => Ok(program),
        Err(err) => Err(program_error_to_js_value(err, None)?),
    }
}
