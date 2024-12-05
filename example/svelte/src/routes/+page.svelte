<script>
    import {
        Logger,
        ConsoleOutput,
        Formats,
        Log,
        Scope,
        Pipeline,
    } from "loggerjs";
    const logger = new Logger("debug", [
        new Pipeline(Formats.json(), [new ConsoleOutput()]),
    ]);
    logger.log({ message: "comida" });
    logger.log(
        new Log({
            level: "debug",
            message: "test",
            error: "error test",
        }),
    );
    console.log("logger 1 scope", logger);
    const new_logger = logger.clone();
    console.log("new logger 1 scope", new_logger);

    new_logger.add_scope(new Scope("info", "test_scope"));
    console.log("new logger 2 scope", new_logger);
    console.log("logger 1 scope", logger);

    console.log(
        "must show log type test_scope, level info, message test_scope",
    );
    new_logger.log(
        new Log({
            level: "debug",
            message: "not shown",
            type: "test_scope",
        }),
    );
    new_logger.log(
        new Log({
            level: "info",
            message: "shown",
            type: "test_scope",
        }),
    );

    const new_new_logger = new_logger.clone();
    new_new_logger.set_scope_level(new Scope("warn", "test_scope"));

    console.log("show", new_logger);
    new_logger.log(
        new Log({
            level: "info",
            message: "shown",
            type: "test_scope",
        }),
    );

    console.log("not show", new_new_logger);
    new_new_logger.log(
        new Log({
            level: "info",
            message: "shown",
            type: "test_scope",
        }),
    );
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
