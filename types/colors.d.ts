export const RESET: "\u001B[0m";
export const FG_BLACK: "\u001B[30m";
export const FG_RED: "\u001B[31m";
export const FG_GREEN: "\u001B[32m";
export const FG_YELLOW: "\u001B[33m";
export const FG_BLUE: "\u001B[34m";
export const FG_MAGENTA: "\u001B[35m";
export const FG_CYAN: "\u001B[36m";
export const FG_WHITE: "\u001B[37m";
export const FG_GRAY: "\u001B[90m";
export const BG_BLACK: "\u001B[40m";
export const BG_RED: "\u001B[41m";
export const BG_GREEN: "\u001B[42m";
export const BG_YELLOW: "\u001B[43m";
export const BG_BLUE: "\u001B[44m";
export const BG_MAGENTA: "\u001B[45m";
export const BG_CYAN: "\u001B[46m";
export const BG_WHITE: "\u001B[47m";
export const BG_GRAY: "\u001B[100m";
export const NAV_BLACK: "black";
export const NAV_RED: "red";
export const NAV_GREEN: "green";
export const NAV_YELLOW: "yellow";
export const NAV_BLUE: "blue";
export const NAV_MAGENTA: "magenta";
export const NAV_CYAN: "cyan";
export const NAV_WHITE: "white";
export const NAV_GRAY: "gray";
export const FOREGROUND_COLORS: Readonly<{
    white: typeof fg_white;
    black: typeof fg_black;
    red: typeof fg_red;
    blue: typeof fg_blue;
    green: typeof fg_green;
    gray: typeof fg_gray;
    cyan: typeof fg_cyan;
    magenta: typeof fg_magenta;
    yellow: typeof fg_yellow;
}>;
export const BACKGROUND_COLORS: Readonly<{
    white: typeof bg_white;
    black: typeof bg_black;
    red: typeof bg_red;
    blue: typeof bg_blue;
    green: typeof bg_green;
    gray: typeof bg_gray;
    cyan: typeof bg_cyan;
    magenta: typeof bg_magenta;
    yellow: typeof bg_yellow;
}>;
/** @typedef {keyof BACKGROUND_COLORS} BackgroundColor */
/** @typedef {keyof FOREGROUND_COLORS} ForegroundColor */
export class Color {
    is_browser: boolean;
    /** @type {[]string} */
    state: [];
    /**
    *
    * @param {string} str
    * @param {{background: BackgroundColor, foreground: ForegroundColor}} [params]
    */
    str(str: string, params?: {
        background: BackgroundColor;
        foreground: ForegroundColor;
    }): void;
    end(): string[];
    #private;
}
export type BackgroundColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray";
export type ForegroundColor = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray";
declare function fg_white(str: any, state: any, is_browser: any): any;
declare function fg_black(str: any, state: any, is_browser: any): any;
declare function fg_red(str: any, state: any, is_browser: any): any;
declare function fg_blue(str: any, state: any, is_browser: any): any;
declare function fg_green(str: any, state: any, is_browser: any): any;
declare function fg_gray(str: any, state: any, is_browser: any): any;
declare function fg_cyan(str: any, state: any, is_browser: any): any;
declare function fg_magenta(str: any, state: any, is_browser: any): any;
declare function fg_yellow(str: any, state: any, is_browser: any): any;
declare function bg_white(str: any, state: any, is_browser: any): any;
declare function bg_black(str: any, state: any, is_browser: any): any;
declare function bg_red(str: any, state: any, is_browser: any): any;
declare function bg_blue(str: any, state: any, is_browser: any): any;
declare function bg_green(str: any, state: any, is_browser: any): any;
declare function bg_gray(str: any, state: any, is_browser: any): any;
declare function bg_cyan(str: any, state: any, is_browser: any): any;
declare function bg_magenta(str: any, state: any, is_browser: any): any;
declare function bg_yellow(str: any, state: any, is_browser: any): any;
export {};
//# sourceMappingURL=colors.d.ts.map