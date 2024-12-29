import { Output, Formatter }  from './interfaces.js'
export { Output, Formatter }  from './interfaces.js'
export { Formats } from './formatters.js'
export { ConsoleOutput } from './output_console.js'
export { WriteStreamOutput } from './output_file.js'
export { LokiFormat, LokiSender } from './loki.js'

export const Level = Object.freeze({
    error: 4,
    warn: 3,
    info: 2,
    debug: 1,
    trace: 0,

    priority: (/** @type {string} */ key) => {
        return Level[key]
    }
})

const ScopeDefaultSymbol = Symbol("DefaultScope")

export class Scope {
    /**
     * @param {'error' | 'warn' | 'info' | 'debug' | 'trace'} level
     * @param { string } type
     */
    constructor(level, type) {
        this.level = level
        this.type = type
    }
    
    static default(level) {
        // @ts-ignore
        return new Scope(level, ScopeDefaultSymbol)
    }
}

export class Pipeline {
    /**
     * 
     * @param {Formatter} formatter 
     * @param {Output[]} outputs 
     */
    constructor(formatter, outputs) {
        this.formatter = formatter
        this.output = outputs
    }

    push(log_obj) {
        const f = this.formatter.format(log_obj)
        for (const out of this.output) {
            out.output(f)
        }
    }
}

export class Logger {
    /**
     * @param { 'error' | 'warn' | 'info' | 'debug' | 'trace' } min_level
     * @param { Pipeline[] } pipelines
     * @param { Scope[] } [scopes]
     */
    constructor(min_level, pipelines, scopes) {
        this.pipelines = pipelines
        this.scopes = scopes
        
        if (this.scopes === undefined || this.scopes.length === 0) {
            this.scopes = [Scope.default(min_level)]
        } else {
            let default_scope = this.#search_scope_by(ScopeDefaultSymbol)
            if (default_scope) {
                if (default_scope.level != min_level) {
                    default_scope.level = min_level
                }
            } else {
                this.scopes.push(Scope.default(min_level))
            }
        }
    }

    /**
     * add a scope if type is not already present
     * @param {Scope} scope
     */
    add_scope(scope) {
        if (!this.#search_scope_by(scope.type)) {
            this.scopes.push(scope)
        }
    }
    
    /**
     * set a scope if a scope with the same type is present
     * @param {Scope} scope
     */
    set_scope_level(scope) {
        let searched_scope = this.#search_scope_by(scope.type)
        if (searched_scope) {
            searched_scope.level = scope.level
        }
    }

    #search_scope_by(type) {
        for (let scope of this.scopes) {
            if (scope.type === type) {
                return scope
            }
        }
        return undefined
    }

    /**
     * @param {any} level
     * @param {any} type
     */
    #check_type(level, type) {
        const scope = this.scopes.find((value) => {
            return value.type === type
        })
        if (scope) {
            return Level.priority(level) >= Level.priority(scope.level)
        } else {
            return false
        }
    }

    /**
     * 
     * @param { { level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type?: any, message: string, error?: any, extra?: Object }} log_obj
     */
    log(log_obj) {
        if (log_obj.time === undefined) {
            log_obj = {
                time: toIsoString(new Date()),
                ...log_obj
            }
        } else if (log_obj.time === null) {
            log_obj.time = toIsoString(new Date())
        }

        if (log_obj.level) {
            const type = log_obj.type ?? ScopeDefaultSymbol
            if (!this.#check_type(log_obj.level, type)) {
                return
            }
        }
        if (log_obj.error) {
            if (log_obj.error instanceof Error) {
                log_obj.stacktrace = log_obj.error.stack
            }
        }
        for (const pipe of this.pipelines) {
            pipe.push(log_obj)
        }
    }

    /**
     * Deep clones the Logger object
     * @returns { Logger }
     */
    clone() {
        let new_scopes = []
        for (let i =0; i < this.scopes.length; i++) {
            const scope = this.scopes[i]
            new_scopes.push(new Scope(scope.level, scope.type))
        }
        let new_pipes = Array.from(this.pipelines);
        
        return new Logger(this.#get_default_scope_min_level(), new_pipes, new_scopes)
    }

    #get_default_scope_min_level() {
        let scope = this.#search_scope_by(ScopeDefaultSymbol)
        if (scope) {
            return scope.level
        } else {
            return undefined
        }
    }
}

export class Log {
    /**
     * 
     * @param { { level: 'error' | 'warn' | 'info' | 'debug' | 'trace', type?: any, message: string, error?: any, extra?: Object }} object 
     */
    constructor({level, type, message, error, extra}) {
        this.time = null
        this.level = level ?? "debug"
        this.type = type
        this.message = message
        this.error = error
        this.extra = extra
    }
    
    /**
     * 
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static error({type, message, error, extra}) {
        return new Log({level: "error", type, message, error, extra})
    }
    /**
     * 
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static warn({type, message, error, extra}) {
        return new Log({level: "warn", type, message, error, extra})
    }
    /**
     * 
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static info({type, message, error, extra}) {
        return new Log({level: "info", type, message, error, extra})
    }
    /**
     * 
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static debug({type, message, error, extra}) {
        return new Log({level: "debug", type, message, error, extra})
    }
    /**
     * 
     * @param  { { type?: any, message: string, error?: any, extra?: Object } } object
     * @returns { Log }
     */
    static trace({type, message, error, extra}) {
        return new Log({level: "trace", type, message, error, extra})
    }
}

/**
 * @param {Date} date
 */
function toIsoString(date) {
	let tzo = -date.getTimezoneOffset()
	let dif = tzo >= 0 ? '+' : '-'
	let pad = function (/** @type {number} */ num) {
		return (num < 10 ? '0' : '') + num
	}
	let pad3 = function (/** @type {number} */ num) {
		if (num < 10) {
			return '00' + num.toString()
		}
		if (num < 100) {
			return '0' + num.toString()
		}
		return num.toString()
	}

	return date.getFullYear() +
		'-' + pad(date.getMonth() + 1) +
		'-' + pad(date.getDate()) +
		'T' + pad(date.getHours()) +
		':' + pad(date.getMinutes()) +
		':' + pad(date.getSeconds()) +
		'.' + pad3(date.getMilliseconds()) +
		dif + pad(Math.floor(Math.abs(tzo) / 60)) +
		':' + pad(Math.abs(tzo) % 60)
}
