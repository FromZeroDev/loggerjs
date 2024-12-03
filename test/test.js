import { ConsoleOutput, Logger, Scope } from "../src/index.js";
import { Formats } from "../src/formatters.js";
import { Output } from "../src/interfaces.js";
import { Log } from "../src/index.js";

function TestBasic() {
    class OutputBuffer extends Output {
        constructor() {
            super()
            this.buffer = ""
        }
    
        output(logstr) {
            this.buffer = `${this.buffer}${logstr}\n`
        }
    }
    const buffer = new OutputBuffer()
    const logger = new Logger("info", buffer, Formats.json(), []);

    logger.log({message: "test message"})
    logger.log({message: "test message 2"})
    logger.log(new Log({
        level: "info",
        message: "log",
    }))

    console.log(buffer.buffer)
}

function TestClone() {
    const logger = new Logger("debug", new ConsoleOutput(), Formats.json());
    logger.log({ message: "comida" });
    logger.log(
        new Log({
            level: "debug",
            message: "test",
            error: "error test",
        }),
    );
    console.log("logger 1 scope", Object.entries(logger));
    const new_logger = logger.clone();
    console.log("new logger 1 scope", Object.entries(new_logger));

    new_logger.add_scope(new Scope("info", "test_scope"));
    console.log("new logger 2 scope", Object.entries(new_logger));
    console.log("logger 1 scope", Object.entries(logger));

    console.log("not show")
    new_logger.log(
        new Log({
            level: "debug",
            message: "not shown",
            type: "test_scope",
        }),
    );
    console.log("show")
    new_logger.log(
        new Log({
            level: "info",
            message: "shown",
            type: "test_scope",
        }),
    );
}

TestBasic()

TestClone()