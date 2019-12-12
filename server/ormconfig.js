require("dotenv").config({path: (".env." + process.env.NODE_ENV)});

const dbOptions = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logger: process.env.DB_LOGGER,
    logging: process.env.DB_LOGGING.split(","),
    cache: {
        type: "redis",
        duration: process.env.CACHE_DURATION, // milliseconds
        options: {
            host: process.env.CACHE_HOST,
            port: process.env.CACHE_PORT,
            password: process.env.CACHE_PASSWORD
        }
    },
    extra: {
        connectionLimit: 10,
        queueLimit: 5
    },
    maxQueryExecutionTime: 1000,    // milliseconds
    migrationsRun: false,
    dropSchema: false,

};

const cliOptions = {
    entities: [
        process.env.BASE_DIR + "domain/**/*.{ts,js}"
    ],
    migrations: [
        process.env.BASE_DIR + "migration/**/*.{ts,js}"
    ],
    subscribers: [
        process.env.BASE_DIR + "subscriber/**/*.{ts,js}"
    ],
    cli: {
        entitiesDir: "src/domain",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    }
};

const setUpDbOptions = () => {
    const profile = process.env.NODE_ENV;
    if (profile !== "local" && profile !== "production") {
        new Error("NODE_ENV 환경변수를 설정해 주세요 :: ex) 'local' or'production'");
    }

    return {
        ...dbOptions,
        ...cliOptions
    };

};

module.exports = setUpDbOptions();