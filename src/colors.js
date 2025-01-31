export const RESET = '\x1B[0m'

export const FG_BLACK = '\x1B[30m'
export const FG_RED = '\x1B[31m'
export const FG_GREEN = '\x1B[32m'
export const FG_YELLOW = '\x1B[33m'
export const FG_BLUE = '\x1B[34m'
export const FG_MAGENTA = '\x1B[35m'
export const FG_CYAN = '\x1B[36m'
export const FG_WHITE = '\x1B[37m'
export const FG_GRAY = '\x1B[90m'

export const BG_BLACK = '\x1B[40m'
export const BG_RED = '\x1B[41m'
export const BG_GREEN = '\x1B[42m'
export const BG_YELLOW = '\x1B[43m'
export const BG_BLUE = '\x1B[44m'
export const BG_MAGENTA = '\x1B[45m'
export const BG_CYAN = '\x1B[46m'
export const BG_WHITE = '\x1B[47m'
export const BG_GRAY = '\x1B[100m'

export const NAV_BLACK = 'black'
export const NAV_RED = 'red'
export const NAV_GREEN = 'green'
export const NAV_YELLOW = 'yellow'
export const NAV_BLUE = 'blue'
export const NAV_MAGENTA = 'magenta'
export const NAV_CYAN = 'cyan'
export const NAV_WHITE = 'white'
export const NAV_GRAY = 'gray'

function fg_white(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_WHITE}`);
        return str;
    } else {
        return `${FG_WHITE}${str}`;
    }
}

function bg_white(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_WHITE}`);
        return str;
    } else {
        return `${BG_WHITE}${str}`;
    }
}

function fg_black(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_BLACK}`);
        return str;
    } else {
        return `${FG_BLACK}${str}`;
    }
}

function bg_black(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_BLACK}`);
        return str;
    } else {
        return `${BG_BLACK}${str}`;
    }
}


function fg_red(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_RED}`);
        return str;
    } else {
        return `${FG_RED}${str}`;
    }
}

function bg_red(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_RED}`);
        return str;
    } else {
        return `${BG_RED}${str}`;
    }
}


function fg_blue(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_BLUE}`);
        return str;
    } else {
        return `${FG_BLUE}${str}`;
    }
}

function bg_blue(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_BLUE}`);
        return str;
    } else {
        return `${BG_BLUE}${str}`;
    }
}

function fg_green(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_GREEN}`);
        return str;
    } else {
        return `${FG_GREEN}${str}`;
    }
}

function bg_green(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_GREEN}`);
        return str;
    } else {
        return `${BG_GREEN}${str}`;
    }
}

function fg_cyan(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_CYAN}`);
        return str;
    } else {
        return `${FG_CYAN}${str}`;
    }
}

function bg_cyan(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_CYAN}`);
        return str;
    } else {
        return `${BG_CYAN}${str}`;
    }
}

function fg_magenta(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_MAGENTA}`);
        return str;
    } else {
        return `${FG_MAGENTA}${str}`;
    }
}

function bg_magenta(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_MAGENTA}`);
        return str;
    } else {
        return `${BG_MAGENTA}${str}`;
    }
}

function fg_yellow(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_YELLOW}`);
        return str;
    } else {
        return `${FG_YELLOW}${str}`;
    }
}

function bg_yellow(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_YELLOW}`);
        return str;
    } else {
        return `${BG_YELLOW}${str}`;
    }
}

function fg_gray(str, state, is_browser) {
    if (is_browser) {
        state.push(`color: ${NAV_GRAY}`);
        return str;
    } else {
        return `${FG_GRAY}${str}`;
    }
}

function bg_gray(str, state, is_browser) {
    if (is_browser) {
        state.push(`background: ${NAV_GRAY}`);
        return str;
    } else {
        return `${BG_GRAY}${str}`;
    }
}

export const FOREGROUND_COLORS = Object.freeze({
    white: fg_white,
    black: fg_black,
    red: fg_red,
    blue: fg_blue,
    green: fg_green,
    gray: fg_gray,
    cyan: fg_cyan,
    magenta: fg_magenta,
    yellow: fg_yellow,
});

export const BACKGROUND_COLORS = Object.freeze({
    white: bg_white,
    black: bg_black,
    red: bg_red,
    blue: bg_blue,
    green: bg_green,
    gray: bg_gray,
    cyan: bg_cyan,
    magenta: bg_magenta,
    yellow: bg_yellow,
});

/** @typedef {keyof BACKGROUND_COLORS} BackgroundColor */
/** @typedef {keyof FOREGROUND_COLORS} ForegroundColor */

export class Color {
    is_browser;
    /** @type {[]string} */
    state;
    #str
    constructor() {
        this.is_browser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
        this.state = []
        this.#str = ""
    }

    /**
    *
    * @param {string} str
    * @param {{background: BackgroundColor, foreground: ForegroundColor}} [params]
    */
    str(str, params) {
        let state = []
        let new_str = str;
        if (this.state.length == 0 && this.is_browser) {
            new_str = `%c${new_str}`
        }
        if (params) {
            if (params.background) {
                new_str = BACKGROUND_COLORS[params.background](new_str, state, this.is_browser)
            }
            if (params.foreground) {
                new_str = FOREGROUND_COLORS[params.foreground](new_str, state, this.is_browser)
            }
        }
        if (this.is_browser) {
            if (state.length != 0) {
                this.state.push(state.join("; "));
            } else {
                this.state.push("");
            }
        }
        if (this.is_browser) {
            new_str += "%c"
        } else {
            new_str += RESET
        }
        this.#str += new_str
    }

    end() {
        return [this.#str, ...this.state]
    }
}
