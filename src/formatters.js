import { Color } from './colors.js'

export class Formats {
    static json() {
        return new Json();
    }

    /**
    * Pretty format for dev mode
    *
    * @param {boolean} [print_extras]
    */
    static pretty(print_extras) {
        return new Pretty(print_extras)
    }
}

class Json {
    format(obj) {
        return JSON.stringify(obj)
    }
}

class Pretty {
    print_extras

    /**
    * @param {boolean} [print_extras]
    */
    constructor(print_extras) {
        this.print_extras = print_extras;
    }

    format(obj) {
        let color = new Color();
        color.str(`${this.format_date(obj.timestamp)}`, { foreground: "gray" })
        color.str(" ")

        switch (obj.level) {
            case undefined: {
                break;
            }
            case "trace": {
                color.str(`${obj.level} `);
                break;
            }
            case "debug": {
                color.str(`${obj.level} `, { foreground: "blue" });
                break;
            }
            case "info": {
                color.str(`${obj.level} `, { foreground: "green" });
                break;
            }
            case "warn": {
                color.str(`${obj.level} `, { foreground: "yellow" });
                break;
            }
            case "error": {
                color.str(`${obj.level} `, { foreground: "red" });
                break;
            }
            default: {
                color.str(`${obj.level} `, { foreground: "gray" });
                break;
            }
        }
        color.str(`${obj.message}`)

        if (obj.error) {
            color.str(" ")
            color.str(`${obj.error}`, { foreground: "red" })
            if (obj.stacktrace) {
                color.str(`\n${obj.stacktrace}`)
            }
        }

        if (this.print_extras && obj.extra) {
            color.str("\nExtra:\n")
            color.str(padlines(`${string_from_extra(obj.extra)}`, 4))
        }

        return color.end()
    }

    /**
    * @param {string | any} date
    */
    format_date(date) {
        if (typeof date !== 'string') {
            return date
        }
        let datetime = new Date(date)
        if (`${datetime}` === "Invalid Date") {
            return date;
        }
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
        return `${pad(datetime.getHours())}:${pad(datetime.getMinutes())}:`
            + `${pad(datetime.getSeconds())}:${pad3(datetime.getMilliseconds())}`
    }
}

function string_from_extra(extra) {
    if (extra instanceof Object) {
        return JSON.stringify(extra, null, 4)
    } else {
        return `${extra}`
    }
}

/**
*
* @param {string} str
* @param {number} spaces
*/
function padlines(str, spaces) {
    const lines = str.split('\n')

    const arr = []; arr[spaces] = ""
    const pad = arr.join(" ")

    for (let i = 0; i < lines.length; i++) {
        lines[i] = `${pad}${lines[i]}`
    }
    return lines.join("\n")
}
