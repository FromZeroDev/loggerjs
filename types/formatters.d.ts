export class Formats {
    static json(): Json;
    static pretty(): Pretty;
}
declare class Json {
    format(obj: any): string;
}
declare class Pretty {
    format(obj: any): string[];
}
export {};
//# sourceMappingURL=formatters.d.ts.map