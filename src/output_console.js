
export class ConsoleOutput {
    output(logstr) {
        if (logstr instanceof Array) {
            console.log(...logstr);
        } else {
            console.log(logstr)
        }
    }
}
