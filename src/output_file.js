const fs = require("fs");

export class WriteStreamOutput {
    stream

    constructor (file) {
        if (file instanceof fs.WriteStream) {
            this.stream = file;
        } else if (file instanceof String || typeof file === "string") {
            const path = file;
            this.stream = fs.createWriteStream(path.toString())
        } else {
            throw new Error("unsupported argument of type " + typeof file + " expected Node fs.WriteStream or a path")
        }
    }

    output(logstr) {
        this.stream.write(logstr);
    }
}