export { Formats } from "./formatters.js";
export { ConsoleOutput } from "./output_console.js";
export const Level: Readonly<{
    error: 4;
    warn: 3;
    info: 2;
    debug: 1;
    trace: 0;
    priority: (key: string) => any;
}>;
export class Scope {
    static default(level: any): Scope;
    /**
     * @param {'error' | 'warn' | 'info' | 'debug' | 'trace'} level
     * @param { string } type
     */
    constructor(level: "error" | "warn" | "info" | "debug" | "trace", type: string);
    level: "trace" | "debug" | "info" | "warn" | "error";
    type: string;
}
export class Pipeline {
    /**
     *
     * @param {Formatter} formatter
     * @param {Output[]} outputs
     */
    constructor(formatter: Formatter, outputs: Output[]);
    formatter: Formatter;
    output: Output[];
    push(log_obj: any): void;
}
export class Logger {
    /**
     * @param { 'error' | 'warn' | 'info' | 'debug' | 'trace' } min_level
     * @param { Pipeline[] } pipelines
     * @param { Scope[] } [scopes]
     */
    constructor(min_level: "error" | "warn" | "info" | "debug" | "trace", pipelines: Pipeline[], scopes?: Scope[]);
    pipelines: Pipeline[];
    scopes: Scope[];
    /**
     * add a scope if type is not already present
     * @param {Scope} scope
     */
    add_scope(scope: Scope): void;
    /**
     * set a scope if a scope with the same type is present
     * @param {Scope} scope
     */
    set_scope_level(scope: Scope): void;
    /**
     *
     * @param { { level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type?: any, message: string, error?: any, extra?: Object }} log_obj
     */
    log(log_obj: {
        level: "error" | "warn" | "info" | "debug" | "trace";
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): void;
    /**
     * Deep clones the Logger object
     * @returns { Logger }
     */
    clone(): Logger;
    #private;
}
export class Log {
    /**
     *
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static error({ type, message, error, extra }: {
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static warn({ type, message, error, extra }: {
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static info({ type, message, error, extra }: {
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static debug({ type, message, error, extra }: {
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static trace({ type, message, error, extra }: {
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param { { level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type?: any, message: string, error?: any, extra?: Object }} object
     */
    constructor({ level, type, message, error, extra }: {
        level: "error" | "warn" | "info" | "debug" | "trace";
        type?: any;
        message: string;
        error?: any;
        extra?: any;
    });
    timestamp: any;
    level: "trace" | "debug" | "info" | "warn" | "error";
    type: any;
    message: string;
    error: any;
    extra: any;
}
import { Formatter } from './interfaces.js';
import { Output } from './interfaces.js';
export { Output, Formatter } from "./interfaces.js";
export { LokiFormat, LokiSender } from "./loki.js";
//# sourceMappingURL=index.d.ts.map