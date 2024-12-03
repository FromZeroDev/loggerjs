export class Formatter {
    /**
     * Transform the javascript log object to a string representation
     *
     * @param { Object } obj
     * @returns { string }
     */
    format(obj: any): string;
}
export class Output {
    /**
     * Write the final log message to the final output
     *
     * @param { string } logstr
     */
    output(logstr: string): void;
}
//# sourceMappingURL=interfaces.d.ts.map