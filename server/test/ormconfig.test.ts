import "dotenv/config";
import options from "../ormconfig";

describe("Test Default SetUp ormconfig.js", () => {
    test("Profile 환경변수를 설정하지 않는다면, 'local'이 디폴트로 설정된다.", () => {
        // when then
        expect(options["host"]).toBe(process.env.LOCAL_DB_HOST);
        expect(options["port"]).toBe(process.env.LOCAL_DB_PORT);
        expect(options["database"]).toBe(process.env.LOCAL_DB);
        expect(options["username"]).toBe(process.env.LOCAL_DB_USER);
        expect(options["password"]).toBe(process.env.LOCAL_DB_PASSWORD);
        expect(options["synchronize"]).toBeTruthy();
        expect(options["logger"]).toBe("advanced-console");
        expect(options["logging"]).toEqual(["query", "warn", "error"]);

    });


});