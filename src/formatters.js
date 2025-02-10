import { Color } from './colors.js'

export class Formats {
    static json() {
        return new Json();
    }

    /**
     * Pretty format for dev mode
     *
     * @param {{printExtras: boolean, printType: boolean}} [config]
     */
    static pretty(config) {
        return new Pretty(config)
    }
}

class Json {
    format(obj) {
        return JSON.stringify(obj)
    }
}

class Pretty {
    printExtras
    printType

    /**
     * @param {{printExtras: boolean, printType: boolean}} [config]
     */
    constructor(config) {
        this.printExtras = config?.printExtras ?? false;
        this.printType = config?.printType ?? false;
    }

    format(obj) {
        let color = new Color();
        color.str(`${this.formatDate(obj.timestamp)}`, { foreground: "gray" });
        color.str(" ");

        switch (obj.level) {
            case undefined: {
                break;
            }
            case "trace": {
                color.str(`${obj.level.padEnd(5)} `);
                break;
            }
            case "debug": {
                color.str(`${obj.level.padEnd(5)} `, { foreground: "blue" });
                break;
            }
            case "info": {
                color.str(`${obj.level.padEnd(5)} `, { foreground: "green" });
                break;
            }
            case "warn": {
                color.str(`${obj.level.padEnd(5)} `, { foreground: "yellow" });
                break;
            }
            case "error": {
                color.str(`${obj.level.padEnd(5)} `, { foreground: "red" });
                break;
            }
            default: {
                color.str(`${obj.level.padEnd(5)} `, { foreground: "gray" });
                break;
            }
        }

        if (this.printType && obj.type) {
            color.str(`${obj.type}`, { foreground: "gray" });
            color.str(" ");
        }

        color.str(`${obj.message}`)

        if (obj.error) {
            color.str(" ")
            color.str(`${obj.error}`, { foreground: "red" })
            if (obj.stacktrace) {
                color.str(`\n${obj.stacktrace}`)
            }
        }

        if (this.printExtras && obj.extra) {
            color.str("\nExtra:\n")
            color.str(padlines(`${string_from_extra(obj.extra)}`, 4))
        }

        return color.end()
    }

    /**
    * @param {string | any} date
    */
    formatDate(date) {
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
