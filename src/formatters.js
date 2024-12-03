export class Formats {
    static json() {
        return new Json();
    }
}

class Json {
    format(obj) {
        return JSON.stringify(obj)
    }
}
