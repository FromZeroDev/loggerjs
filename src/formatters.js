import { Color } from './colors.js'

export class Formats {
    static json() {
        return new Json();
    }

    static pretty() {
        return new Pretty()
    }
}

class Json {
    format(obj) {
        return JSON.stringify(obj)
    }
}

class Pretty {
    format(obj) {
        let color = new Color();
        color.str(`${obj.timestamp}`, { foreground: "gray" })
        color.str(" ")

        switch (obj.level) {
            case "trace": {
                color.str(`${obj.level}`);
                break;
            }
            case "debug": {
                color.str(`${obj.level}`, { foreground: "blue" });
                break;
            }
            case "info": {
                color.str(`${obj.level}`, { foreground: "green" });
                break;
            }
            case "warn": {
                color.str(`${obj.level}`, { foreground: "yellow" });
                break;
            }
            case "error": {
                color.str(`${obj.level}`, { foreground: "red" });
                break;
            }
            default: {
                color.str(`${obj.level}`, { foreground: "gray" });
                break;
            }
        }
        color.str(" ")
        color.str(`${obj.message}`)

        if (obj.error) {
            color.str(" ")
            color.str(`${obj.error}`, { foreground: "red" })
        }
        return color.end()
    }
}
