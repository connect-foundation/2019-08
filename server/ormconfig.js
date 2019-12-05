/**
 *
 * 환경 따라 TypeORM 설정을 다르게 한다.
 *
 **/
const profiles = {
    local: {
        host: process.env.LOCAL_DB_HOST,
        port: process.env.LOCAL_DB_PORT,
        database: process.env.LOCAL_DB,
        username: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASSWORD,
        synchronize: true,
        logger: "advanced-console",
        logging: ["query", "warn", "error"],
    },
    development: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        database: process.env.DEV_DB,
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        synchronize: false,
        logger: "file",
        logging: "all",
    },
    production: {
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        database: process.env.PROD_DB,
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        synchronize: false,
        logger: "file",
        logging: ["query", "error"],
    }
};

/**
 *
 * TypeORM 공통 설정을 다르게 한다.
 *
 **/
const common = {
    type: "mysql",
    dropSchema: false,
    maxQueryExecutionTime: 1000,    // milliseconds
    entities: [
        process.env.BASE_DIR + "domain/**/*.{ts,js}"
    ],
    migrations: [
        process.env.BASE_DIR + "migration/**/*.{ts,js}"
    ],
    subscribers: [
        process.env.BASE_DIR + "subscriber/**/*.{ts,js}"
    ],
    migrationsRun: false,
    cli: {
        entitiesDir: "src/domain",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    },
    extra: {
        connectionLimit: 10,
        queueLimit: 5
    }
};

/**
 *
 * PROFILE 환경 변수에 따라, TypeORM 설정 정보를 다르게 제공한다.
 * default 는 "local" 이다.
 *
 **/
const setUpDbOptions = () => {
    let profile = process.env.NODE_ENV;
    if (!Object.keys(profiles).includes(profile)) {
        profile = "local";

    }

    return {
        ...profiles[profile],
        ...common
    };

};

module.exports = setUpDbOptions();