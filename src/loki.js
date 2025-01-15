
export class LokiSender {
    username
    password
    url

    /**
     *
     * @param { {url: string, username: string, password: string} } param0
     */
    constructor({ url, username, password }) {
        this.username = username
        this.password = password
        this.url = url
    }

    async #send(body) {
        const response = await fetch(this.url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
            },
            body: body,
        })
        if (response.status != 204) {
            console.error(`error invalid status code. expected 204 got ${response.status}:\n${await response.text()}`)
        }
    }

    async send(labels, logs) {
        const transformed = logs.map((val) => {
            return [(val[0].getTime() * 1000 * 1000).toString(), val[1]]
        })
        return await this.#send(JSON.stringify({
            "streams": [
                {
                    "stream": labels,
                    "values": transformed
                },
            ]
        }))
    }

    output(log) {
        this.send(log.labels, [log.log]).catch(console.log);
    }
}

export class LokiFormat {
    #json_format = Formats.json();
    job;

    /**
     *
     * @param {{ job: string }} param0
     */
    constructor({ job }) {
        this.job = job;
    }

    format(log_obj) {
        return {
            labels: {
                "job": this.job,
                "level": log_obj.level ?? "trace",
            },
            log: [new Date(), this.#json_format.format(log_obj)]
        }
    }
}
