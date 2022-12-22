export interface Program {

}

export interface create_program {
    (source: string, location: string | undefined): Program;
}

export interface parser_values {
    (program_source: Program, values: any): any;
}

export interface Envuse {
    create_program: create_program,
    parser_values: parser_values,
}

export declare const envuse: () => Promise<Envuse>;
