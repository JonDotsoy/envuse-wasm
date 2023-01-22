export interface Span {
    start: number
    end: number
}

export interface WithSpan {
    span: Span
}

export interface Variable extends WithSpan {
    comment?: { CommentBlock: CommentBlock }
    name: string
    variable_type?: string
    options_variable_type?: Map<string, { OptionValue: OptionValue }>
    default_value?: { DefaultValue: DefaultValue }
    nullable: boolean
}
export interface OptionValue extends WithSpan {
    value: string
}
export interface DefaultValue extends WithSpan {
    value: string
}
export interface CommentBlock extends WithSpan {
    raw: string[]
}
export interface Document extends WithSpan {
    executable?: string
    elements: (CommentBlock | Variable)[]
}

export interface Program {
    location?: string
    source: string
    ast: {
        Document: Document
    }
}

export interface create_program {
    (source: string, location?: string): Program;
}

export type TypeString = { String: string }
export type TypeBoolean = { Boolean: boolean }
export type TypeNumber = { Number: number }
export type TypeCustom = { Custom: [string, string] }
export type CustomTypes = TypeString | TypeBoolean | TypeNumber | TypeCustom

export interface parser_values {
    (program_source: Program, values: Record<string, undefined | string>, customTypes?: string[]): Map<string, CustomTypes>;
}

export interface Envuse {
    create_program: create_program,
    parser_values: parser_values,
}

export declare const loadEnvuse: () => Envuse;
