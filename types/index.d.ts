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
    constructor(level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type: string);
    level: "error" | "warn" | "info" | "debug" | "trace";
    type: string;
}
export class Logger {
    /**
     * @param { 'error' | 'warn' | 'info' | 'debug' | 'trace' } min_level
     * @param { Output } output
     * @param { Formatter } formatter
     * @param { Scope[] } [scopes]
     */
    constructor(min_level: 'error' | 'warn' | 'info' | 'debug' | 'trace', output: Output, formatter: Formatter, scopes?: Scope[]);
    output: Output;
    formatter: Formatter;
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
    log(log_obj: any): void;
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
     * @param  { { type?: any, message: string, error?: any, stacktrace?: any, extra?: Object } } object
     * @returns { Log }
     */
    static error({ type, message, error, stacktrace, extra }: {
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, stacktrace?: any, extra?: Object } } object
     * @returns { Log }
     */
    static warn({ type, message, error, stacktrace, extra }: {
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, stacktrace?: any, extra?: Object } } object
     * @returns { Log }
     */
    static info({ type, message, error, stacktrace, extra }: {
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, stacktrace?: any, extra?: Object } } object
     * @returns { Log }
     */
    static debug({ type, message, error, stacktrace, extra }: {
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param  { { type?: any, message: string, error?: any, stacktrace?: any, extra?: Object } } object
     * @returns { Log }
     */
    static trace({ type, message, error, stacktrace, extra }: {
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    }): Log;
    /**
     *
     * @param { { level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type?: any, message: string, error?: any, stacktrace?: any, extra?: Object }} object
     */
    constructor({ level, type, message, error, stacktrace, extra }: {
        level: 'error' | 'warn' | 'info' | 'debug' | 'trace';
        type?: any;
        message: string;
        error?: any;
        stacktrace?: any;
        extra?: any;
    });
    time: any;
    level: "error" | "warn" | "info" | "debug" | "trace";
    type: any;
    message: string;
    error: any;
    stacktrace: any;
    extra: any;
}
import { Output } from './interfaces.js';
import { Formatter } from './interfaces.js';
export { Output, Formatter } from "./interfaces.js";
//# sourceMappingURL=index.d.ts.map