import { createWriteStream, WriteStream } from "node:fs";

export class WriteStreamOutput {
    stream

    constructor(file) {
        if (file instanceof WriteStream) {
            this.stream = file;
        } else if (file instanceof String || typeof file === "string") {
            const path = file;
            this.stream = createWriteStream(path.toString())
        } else {
            throw new Error("unsupported argument of type " + typeof file + " expected Node fs.WriteStream or a path")
        }
    }

    output(logstr) {
        this.stream.write(logstr);
    }
}
