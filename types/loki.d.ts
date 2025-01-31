export class LokiSender {
    /**
     *
     * @param { {url: string, username: string, password: string} } param0
     */
    constructor({ url, username, password }: {
        url: string;
        username: string;
        password: string;
    });
    username: string;
    password: string;
    url: string;
    send(labels: any, logs: any): Promise<void>;
    output(log: any): void;
    #private;
}
export class LokiFormat {
    /**
     *
     * @param {{ job: string }} param0
     */
    constructor({ job }: {
        job: string;
    });
    job: string;
    format(log_obj: any): {
        labels: {
            job: string;
            level: any;
        };
        log: (string | Date)[];
    };
    #private;
}
//# sourceMappingURL=loki.d.ts.map